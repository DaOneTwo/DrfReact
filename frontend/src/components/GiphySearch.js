import React, {Component} from "react";

import GiphySearchGallery from "./GiphySearchGallery";


class GiphySearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            lastSearchValue: '',
            searchValue: '',
            searchResults: [],
            searchPosition: 0,
            userFavorites: props.userFavorites,
            favoritesData: props.favoritesData
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    resetSearchState(){
        this.setState({
            lastSearchValue: '',
            searchResults: [],
            searchPosition: 0,
            // not setting search value because it is the key component that is handled with onChange of the input.
        })
    }

    componentWillReceiveProps(props) {
        this.setState({userFavorites: props.userFavorites,
                             favoritesData: props.favoritesData});
    }

    handleChange(event) {
        this.setState({searchValue: event.target.value.toLowerCase()});
    }

    submitSearch(event){
        if (this.state.searchValue){
            if (this.state.searchValue !== this.state.lastSearchValue) {
                this.resetSearchState();
            }

            // yup this is hacky for url assembly but making it work for now.
            let url = '/api/giphy/search/?search=' + this.state.searchValue + '&offset=' + this.state.searchPosition.toString();
            fetch(url)
                .then(response => response.json()
                    .then(data => ({
                            data: data,
                            status: response.status
                        })
                    )
                    .then(res => {
                        if (res.status === 200) {
                            let new_results = this.state.searchResults.concat(res.data.data);
                            this.setState({
                                searchPosition: res.data.pagination.next_page_offset,
                                searchResults: new_results,
                                lastSearchValue: this.state.searchValue
                            });
                        }
                    })
                );
            event.preventDefault();
        } else {
            //ToDo: else what??
        }
    }

    render(){
        return (
            <div>
                <div className="row col-sm-12 pt-4">
                    <div className="search-box col-sm-10 col-md-4">
                        <input type="text" value={this.state.searchValue} onChange={this.handleChange}/>
                    </div>
                    <div className="search-button col-sm-2 col-md-4">
                        <button className="btn btn-primary" onClick={this.submitSearch}>Search Giphy</button>
                    </div>
                </div>
                <div className="row col-sm-12 pt-4">
                    <GiphySearchGallery
                        images={this.state.searchResults}
                        userFavorites={this.state.userFavorites}
                        favoritesData={this.state.favoritesData}
                        saveFavorite={this.props.saveFavorite}
                        deleteFavorite={this.props.deleteFavorite}
                    />
                </div>
            </div>

        );
    }
}

export default GiphySearch;