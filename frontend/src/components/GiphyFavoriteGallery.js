import React, {Component} from "react";

import Gallery from "react-grid-gallery";
import PropTypes from "prop-types";


class GiphyFavoriteGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            images: [],
            favoritesData: [],
        };
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
        this.saveFavorite = this.saveFavorite.bind(this);
    }

    componentWillReceiveProps(props) {
        var images = props.favoritesData.map(data => {
            return data.image_data
        });
        this.setState({favoritesData: props.favoritesData,
                             images: images});
    }

    onCurrentImageChange(index) {
        this.setState({ currentImage: index });
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
                    enableLightbox={false}
                    currentImageWillChange={this.onCurrentImageChange}
                    // customControls={[
                    //     <button key="save_button" className="btn btn-primary" onClick={this.saveFavorite}>Save As Favorite</button>
                    // ]}
                />
            </div>
        );
    }
}

GiphySearchGallery.propTypes = {
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

export default GiphySearchGallery;