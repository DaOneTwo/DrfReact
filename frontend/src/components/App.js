import React, {Component} from "react";
import ReactDOM from "react-dom";

import GiphyInterface from "./GiphyInterface"





class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            user_data: null,
        };
        if (!this.state.user_data) {
            this.getUserData();
        }
    };

    getUserData() {
        fetch('/api/user/')
            .then(response => response.json()
                .then(data => ({
                        data: data,
                        status: response.status
                    })
                )
                .then(res => {
                    if (res.status === 200) {
                        this.setState({loaded: true, user_data: res.data});
                    }
                })
            );
    };

    render() {
        if (this.state.user_data) {

            return (
                <div className="profile-page">
                    <div className="profile_header row col-sm-12 pt-2">
                        <h3>Welcome {this.state.user_data.username}</h3>
                    </div>
                    <div className="row col-sm-12">
                        <GiphyInterface
                            user_data={this.state.user_data}
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