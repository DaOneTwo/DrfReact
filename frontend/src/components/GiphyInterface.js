import React, {Component} from "react";
import GiphySearch from './GiphySearch';


class GiphyInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_favorites: [],
            favorites_data: [],
        };
    this.getUserFavorites();
    }

    getUserFavorites(){
        fetch('/api/giphy/favorite/')
            .then(response => response.json()
                .then(data => ({
                        data: data,
                        status: response.status
                    })
                )
                .then(res => {
                    if (res.status === 200) {
                        let faves = res.data.map(data => {
                            return data.giphy_id
                        });
                        this.setState({user_favorites: faves});

                    }
                })
            );
    }

    render() {
        return (
            <div className="row col-sm-12 pt-3">
                <div className="col-md-6">
                    Your Favorites
                </div>
                <div className="col-md-6">
                    Search Giphy
                    <GiphySearch
                        user_favorites={this.state.user_favorites}
                    />
                </div>
            </div>
        );
    }
}

export default GiphyInterface;