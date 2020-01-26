import React, {Component} from "react";

import Gallery from "react-grid-gallery";
import PropTypes from "prop-types";


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

class GiphyGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_image: 0,
            images: props.images,
            user_favorites:  props.user_favorites,
        };
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
        this.saveFavorite = this.saveFavorite.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({images: props.images,
                             user_favorites: props.user_favorites});

    }

    onCurrentImageChange(index) {
        this.setState({ current_image: index });
    }

    saveFavorite(){
        var csrftoken = getCookie('csrftoken');
        var image = this.state.images[this.state.current_image];
        var body = {giphy_id: image.giphyId};

        // this is less than ideal but for now... (figuring out how to make the button a component of its own
        // would be better)
        // ... before we try to save the favorite lets make sure it is not already in our favorites just to try and
        // save some traffic to our API.
        if (!this.is_user_favorite(image.giphyId)) {
            fetch('api/giphy_favorite/',
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrftoken,
                    },
                    body: JSON.stringify(body)
                }).then(response => response.json()
                .then(data => ({
                        data: data,
                        status: response.status
                    })
                )
                .then(res => {
                        if (res.status === 201) {
                            image.isSelected = true;
                            this.state.user_favorites.push(image.giphyId);
                        }
                    }
                )
            )
        }
    }

    is_user_favorite(imageId){
        return (this.state.user_favorites.indexOf(imageId) !== -1);
    }

    render() {
        var images =
            this.state.images.map((i) => {
                i.customOverlay = (
                    <div style={captionStyle}>
                        <div>{i.caption}</div>
                        {i.hasOwnProperty('tags') &&
                        this.setCustomTags(i)}
                    </div>);
                i.isSelected = this.is_user_favorite(i.giphyId);

                return i;
            });

        return (
            <div style={{
                minHeight: "1px",
                maxHeight: "250px",
                width: "100%",
                border: "1px solid #ddd",
                overflow: "auto",}}
            >

                <Gallery
                    images={images}
                    enableImageSelection={false}
                    enableLightbox={true}
                    currentImageWillChange={this.onCurrentImageChange}
                    showLightboxThumbnails={true}
                    customControls={[
                        <button key="save_button" className="btn btn-primary" onClick={this.saveFavorite}>Save As Favorite</button>
                    ]}
                />
            </div>
        );
    }
}

GiphyGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired,
            giphyId: PropTypes.string
        })
    ).isRequired
};

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

export default GiphyGallery;