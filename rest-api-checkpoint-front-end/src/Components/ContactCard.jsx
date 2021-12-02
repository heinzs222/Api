import React, { Component } from "react";
import MyModal from "./MyModal";

export class ContactCard extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { _id, name, email, tel } = this.props.contact;
    return (
      <div>
        <p>
          <b>Name:</b> {name}
        </p>
        <p>
          <b>Email:</b> {email}
        </p>
        <p>
          <b>Number:</b> {tel}
        </p>
        <button
          onClick={() => {
            this.props.deleteContact(_id);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            this.toggle();
          }}
        >
          Edit
        </button>
        {this.state.modal ? (
          <MyModal
            modal={this.state.modal}
            toggle={this.toggle}
            type={"Edit"}
            contact={this.props.contact}
            updateContact={this.props.updateContact}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default ContactCard;
