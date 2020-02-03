import React, {Component} from "react";
import GiphySearch from './GiphySearch';
import GiphyUserFavorites from './GiphyUserFavorites';


class GiphyInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFavorites: [],
            favoritesData: [],
        };
    this.saveFavorite = this.saveFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
    }

    componentDidMount() {
        this.getFavorites();
    }

    deleteFavorite(image){
        // delete a user favorite associated with the authenticated user
        let index = this.state.userFavorites.indexOf(image.giphyId);
        let favoriteId = this.state.favoritesData[index].favorite_id.toString();
        this.props.backendService.deleteUserFavorite(favoriteId);
        this.getFavorites();
    }

    saveFavorite(image){
        this.props.backendService.saveUserFavorite(image.giphyId);
        this.getFavorites();
    }

    getFavorites(){
        this.props.backendService.getUserFavorites()
            .then(response => {
                let faveData = response;
                let faves = faveData.map(data => {return data.giphy_id});
                this.setState({
                    userFavorites: faves,
                    favoritesData: faveData
                })
            });
    }

    render() {
        return (
            <div className="row col-sm-12 pt-3">
                <div className="col-md-6">
                    Your Favorites
                    <GiphyUserFavorites
                        favoritesData={this.state.favoritesData}
                        saveFavorite={this.saveFavorite}
                        deleteFavorite={this.deleteFavorite}
                    />
                </div>
                <div className="col-md-6">
                    Search Giphy
                    <GiphySearch
                        userFavorites={this.state.userFavorites}
                        saveFavorite={this.saveFavorite}
                        deleteFavorite={this.deleteFavorite}
                    />
                </div>
            </div>
        );
    }
}

export default GiphyInterface;