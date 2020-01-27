import React, {Component} from "react";
import GiphySearch from './GiphySearch';
import GiphyUserFavorites from './GiphyUserFavorites';


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

class GiphyInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_favorites: [],
            favorites_data: [],
        };
    this.getUserFavorites();

    this.saveFavorite = this.saveFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
    }

    deleteFavorite(image){
        // delete a user favorite associated with the authenticated user
        var index = this.state.user_favorites.indexOf(image.giphyId);
        var csrftoken = getCookie('csrftoken');

        fetch('api/giphy/favorite/'+ this.state.favorites_data[index].favorite_id.toString(),
                {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrftoken,
                        'cache-control': 'no-cache',
                        'pragma': 'no-cache',
                    }
                }).then(response => response.json()
                    .then(data => ({
                            data: data,
                            status: response.status
                        })
                    )
                        .then(res => {
                            if (res.status === 204) {

                            }
                        })
                );

        this.getUserFavorites();
    }

    saveFavorite(image){
        // save a favorite associated with the authenticated user
        var csrftoken = getCookie('csrftoken');
        var body = {giphy_id: image.giphyId};

        fetch('api/giphy/favorite/',
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': csrftoken,
                        'cache-control': 'no-cache',
                        'pragma': 'no-cache',
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

                            }
                        })
                );

        this.getUserFavorites();
    }

    getUserFavorites(){
        fetch('/api/giphy/favorite/',
            {
                headers: {
                    'cache-control': 'no-cache',
                    'pragma': 'no-cache',
                }
            })
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
                        this.setState({
                            user_favorites: faves,
                            favorites_data: res.data
                        });

                    }
                })
            );
    }


    render() {
        return (
            <div className="row col-sm-12 pt-3">
                <div className="col-md-6">
                    Your Favorites
                    <GiphyUserFavorites
                        favorites_data={this.state.favorites_data}
                        save_favorite={this.saveFavorite}
                        delete_favorite={this.deleteFavorite}
                    />
                </div>
                <div className="col-md-6">
                    Search Giphy
                    <GiphySearch
                        user_favorites={this.state.user_favorites}
                        save_favorite={this.saveFavorite}
                        delete_favorite={this.deleteFavorite}
                    />
                </div>
            </div>
        );
    }
}

export default GiphyInterface;