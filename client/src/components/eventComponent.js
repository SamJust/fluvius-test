import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { UpdateEvent, DeleteEvent } from '../store/actions';

class Event extends React.Component {

  state = {
    modal:false
  }

  nameRef = React.createRef()

  dateRef = React.createRef()

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateEvent = event => {
    const name = this.nameRef.current.value || this.props.event.name;
    const date = this.dateRef.current.value || this.props.event.date;
    this.props.updateEvent({
      _id:this.props.event._id,
      name,
      date
    });
  }

  deleteEvent = event => {
    if(!window.confirm('Are you sure you want to delete this event?'))return;
    this.props.deleteEvent(this.props.event._id);
  } 

  render (){
    const { name, date } = this.props.event
    return(
      <div onClick={this.toggleModal} className='event'>
        {name}
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader>
            Edit event {name} on {date}
          </ModalHeader>
          <ModalBody>
            <input defaultValue={date} ref={this.dateRef} placeholder='Event date' />
            <input defaultValue={name} ref={this.nameRef} placeholder='Event name' />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.updateEvent}>Submit</Button>
            <Button color='danger' onClick={this.deleteEvent}>Delete</Button>
            <Button onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {

  };
}

function mapDispatchToProps(dispatch){
  return {
    deleteEvent: bindActionCreators(DeleteEvent, dispatch),
    updateEvent: bindActionCreators(UpdateEvent, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);