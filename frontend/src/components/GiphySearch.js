import React, {Component} from "react";

import GiphyGallery from "./GiphyGallery";


class GiphySearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            last_search_value: '',
            search_value: '',
            search_results: [],
            search_position: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    resetSearchState(){
        this.setState({
            last_search_value: '',
            search_results: [],
            search_position: 0
            // not setting search value because it is the key component that is handled with onChange of the input.
        })
    }

    handleChange(event) {
        this.setState({search_value: event.target.value.toLowerCase()});
    }

    submitSearch(event){
        if (this.state.search_value){
            if (this.state.search_value !== this.state.last_search_value) {
                this.resetSearchState();
            }

            // yup this is hacky for url assembly but making it work for now.
            let url = '/api/giphy/search/?search=' + this.state.search_value + '&offset=' + this.state.search_position.toString();
            fetch(url)
                .then(response => response.json()
                    .then(data => ({
                            data: data,
                            status: response.status
                        })
                    )
                    .then(res => {
                        if (res.status === 200) {
                            let new_results = this.state.search_results.concat(res.data.data);
                            this.setState({
                                search_position: res.data.pagination.next_page_offset,
                                search_results: new_results,
                                last_search_value: this.state.search_value
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
                        <input type="text" value={this.state.search_value} onChange={this.handleChange}/>
                    </div>
                    <div className="search-button col-sm-2 col-md-2">
                        <button className="btn btn-primary" onClick={this.submitSearch}>Search Giphy</button>
                    </div>
                </div>
                <div className="row col-sm-12 pt-4">
                    <GiphyGallery
                        images={this.state.search_results}
                        user_favorites={this.props.user_favorites}
                    />
                </div>
            </div>

        );
    }
}

export default GiphySearch;