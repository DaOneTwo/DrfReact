import React, {Component} from "react";
import ReactDOM from "react-dom";

import Gallery from "react-grid-gallery";
import Popup from "reactjs-popup";


function Modal(){
    return (
        <Popup
            trigger={<button className="btn" id="open_modal"> Open Modal </button>}
            modal
            closeOnDocumentClick
        >
            <span> Modal content </span>
        </Popup>
    );
}

class ControlledPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
            omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
            ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
            doloribus. Odit, aut.
            </p>
          </div>
        </Popup>
      </div>
    );
  }
}



class GiphyUserFavorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites_data: [],
            images: [],
            open_modal: true,
        }
    }

    componentWillReceiveProps(props) {
        var images = props.favorites_data.map(data => {
            return data.image_data
        });
        this.setState({
            favorites_data: props.favorites_data,
            images: images
        });
    }

    renderPopup(index) {
        alert('here is where we will allow things like categorization and deletion of the favorite row.  ' +
            'Currently trying to figure out modals');
        // ReactDOM.render(<ControlledPopup/>, document.getElementById('modal'))
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
                        overflow: "auto",
                    }}
                    >
                        <Gallery
                            images={this.state.images}
                            enableImageSelection={true}
                            enableLightbox={false}
                            // onSelectImage={this.renderPopup}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default GiphyUserFavorites;