import React, {Component} from "react";


class GiphyFavoriteButton extends Component {
    //  A Button that will support adding/removing a giphy entry as a favorite.

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: props.isFavorite,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            isFavorite: props.isFavorite
        });
    }

    render() {
        var base_class = 'btn ';
        var button_class = this.state.isFavorite ? base_class + 'btn-success' : base_class + 'btn-danger';

        return (
            <button className={button_class}>favorite</button>
        );
    }
}

export default GiphyFavoriteButton;