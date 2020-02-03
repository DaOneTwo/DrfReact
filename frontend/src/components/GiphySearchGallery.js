import React, {Component} from "react";
import PropTypes from "prop-types";

import Gallery from "react-grid-gallery";

import GiphyFavoriteButton from "./GiphyFavoriteButton"


class GiphySearchGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            images: props.images,
            userFavorites:  props.userFavorites,
            favoritesData: props.favoritesData
        };
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            images: props.images,
            userFavorites: props.userFavorites,
            favoritesData: props.favoritesData
        });
    }

    onCurrentImageChange(index) {
        this.setState({currentImage: index });
    }

    toggleFavorite(index){
        console.log(index);
        var image = this.state.images[index];
        var img_id = image.giphyId;

        if (!this.is_user_favorite(img_id)){
            this.props.saveFavorite(image)

        } else {
            this.props.deleteFavorite(image)
        }
    }

    is_user_favorite(imageId){
        return (this.state.userFavorites.indexOf(imageId) !== -1);
    }

    render() {
        var images =
            this.state.images.map((i) => {
                var isFav = this.is_user_favorite(i.giphyId);
                i.customOverlay = (
                    <div style={captionStyle}>
                        <GiphyFavoriteButton
                            isFavorite={isFav}
                        />

                    </div>
                );
                i.isSelected = isFav;
                return i;
            });

        return (
            <div style={{
                minHeight: "1px",
                maxHeight: "540px",
                width: "100%",
                border: "1px solid #ddd",
                overflow: "auto",}}
            >
                <Gallery
                    images={images}
                    enableImageSelection={true}
                    onSelectImage={this.toggleFavorite}
                    enableLightbox={false}
                    currentImageWillChange={this.onCurrentImageChange}
                    showLightboxThumbnails={true}
                    customControls={[
                        <button key="fave_button" className="btn btn-primary" onClick={this.toggleFavorite}>Toggle Favorite</button>
                    ]}
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