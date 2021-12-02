import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      tel: ""
    };
  }

  componentDidMount = () => {
    const type = this.props.type;
    type === "Edit"
      ? this.setState({
          _id: this.props.contact._id,
          name: this.props.contact.name,
          email: this.props.contact.email,
          tel: this.props.contact.tel
        })
      : console.log("this is the Add Modal");
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    this.props.type === "Add"
      ? this.props.addContact(this.state)
      : this.props.updateContact(this.state);
  };
  render() {
    return (
      <div>
        <div>
          <Modal
            isOpen={this.props.modal}
            toggle={this.props.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.props.toggle}>
              {this.props.type === "Add" ? "Add Contact" : "Edit Contact"}
            </ModalHeader>
            <ModalBody>
              <div className="inputArea">
                <input
                  type="text"
                  name="name"
                  defaultValue={this.state.name}
                  onChange={this.handleChange}
                  placeholder="name"
                />
                <input
                  type="text"
                  name="email"
                  defaultValue={this.state.email}
                  onChange={this.handleChange}
                  placeholder="email"
                />
                <input
                  type="text"
                  name="tel"
                  defaultValue={this.state.tel}
                  onChange={this.handleChange}
                  placeholder="tel"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  this.handleSubmit();
                  this.props.toggle();
                }}
              >
                Save Changes
              </Button>{" "}
              <Button color="secondary" onClick={this.props.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default MyModal;
