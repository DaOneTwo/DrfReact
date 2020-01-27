import React, {Component} from "react";

import Gallery from "react-grid-gallery";


class GiphyUserFavorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites_data: [],
            images: []
        }
    }

    componentWillReceiveProps(props) {
        var images = props.favorites_data.map(data => {return data.image_data})
        this.setState({
            favorites_data: props.favorites_data,
            images: images
        });
    }

    render() {
        return (
            <div>
                <div className="row col-sm-12">
                    <div style={{
                            minHeight: "1px",
                            maxHeight: "540px",
                            width: "100%",
                            border: "1px solid #ddd",
                            overflow: "auto",}}
                    >
                        <Gallery
                            images={this.state.images}
                            enableImageSelection={false}
                            enableLightbox={true}
                            currentImageWillChange={this.onCurrentImageChange}
                            showLightboxThumbnails={true}

                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default GiphyUserFavorites;