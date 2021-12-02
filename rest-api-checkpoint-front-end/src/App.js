import React from "react";
import axios from "axios";

import "./App.css";
import ContactCard from "./Components/ContactCard";
import MyModal from "./Components/MyModal";

class App extends React.Component {
  state = {
    contacts: [],
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  getAllContacts = () => {
    axios.get("/contacts").then(response =>
      this.setState({
        contacts: response.data
      })
    );
  };

  deleteContact = id => {
    axios.delete(`/delete_contact/${id}`).then(this.getAllContacts());
  };
  addContact = newContact => {
    axios.post("/add_contact", newContact).then(this.getAllContacts());
  };
  updateContact = updatedContact => {
    axios
      .put(`/update_contact/${updatedContact._id}`, {
        name: updatedContact.name,
        email: updatedContact.email,
        tel: updatedContact.tel
      })
      .then(this.getAllContacts());
  };

  componentDidMount() {
    this.getAllContacts();
  }

  render() {
    return (
      <div className="App">
        <div className="ContactList">
          {this.state.contacts.map((contact, index) => (
            <ContactCard
              key={index}
              contact={contact}
              deleteContact={this.deleteContact}
              updateContact={this.updateContact}
              toggle={this.toggle}
            />
          ))}
        </div>
        <button className="add-button" onClick={this.toggle}>
          Add
        </button>
        {this.state.modal ? (
          <MyModal
            modal={this.state.modal}
            toggle={this.toggle}
            addContact={this.addContact}
            type={"Add"}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default App;
