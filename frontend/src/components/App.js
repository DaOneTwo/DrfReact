import React, {Component} from "react";
import ReactDOM from "react-dom";

import GiphyInterface from "./GiphyInterface"
import backendService from "../data_providers/backend";


class App extends Component {
    constructor(props) {
        super(props);
        this.apiService = new backendService();
        this.state = {
            loaded: false,
            userData: null,
            show_modal: false,
        };
    };

    componentDidMount() {
        if (!this.state.userData) {
            this.loadUserData();
        }
    }

    loadUserData() {
       this.apiService.getUserData()
           .then(response => {
                this.setState({loaded: true, userData: response});
            });
    }

    render() {
        if (this.state.userData) {
            return (
                <div className="profile-page">
                    <div className="profile_header row col-sm-12 pt-2">
                        <h3>Welcome {this.state.userData.username}</h3>
                    </div>
                    <div className="row col-sm-12">
                        <GiphyInterface
                            userData={this.state.userData}
                            backendService={this.apiService}
                        />
                    </div>
                </div>

            );

        } else {
            return 'No content'
        }
    };
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);