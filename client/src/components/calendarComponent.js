import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Day from '../containers/dayContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CreateEvent, setToken } from '../store/actions';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import mapWithEmpty from '../utils/mapWithEmpty';

class Calendar extends React.Component{

  state = {
    modal: false,
  }

  dateRef = React.createRef()

  nameRef = React.createRef()

  createEvent = event => {
    const date = this.dateRef.current.value;
    const name = this.nameRef.current.value;
    if(!date || !name) return;
    this.props.CreateEvent({
      name,
      date
    });
    this.dateRef.current.value = '';
    this.nameRef.current.value = '';
  }

  mapEventsToDays(week){
    return week.map(day => {
      day.events = this.props.events.filter(event => event.date === day.date);
      return day;
    });
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  logOut = event => {
    window.localStorage.removeItem('token');
    this.props.setToken();
  }  

  render(){
    if(!this.props.token) return <Redirect to='/login' />
    return(
      <Container fluid>
        <Button color='primary' onClick={this.toggleModal}>Create event</Button>
        <Button onClick={this.logOut}>Log out</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
          <ModalHeader>
            Create event
          </ModalHeader>
          <ModalBody>
            <input ref={this.dateRef} placeholder='Enter date in format mm-dd-yyyy'/>
            <input ref={this.nameRef} placeholder='Enter name'/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.createEvent}>Submit</Button>
            <Button onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col>Sun</Col>
          <Col>Mon</Col>
          <Col>Tue</Col>
          <Col>Wen</Col>
          <Col>Thur</Col>
          <Col>Fri</Col>
          <Col>Sat</Col>
        </Row>
        {this.props.weeks.map((week, index) => <Row key={index}>
          {mapWithEmpty(this.mapEventsToDays(week), (day, index) => <Col key={index}><Day day={day} /></Col>)}
        </Row>)}
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    weeks: state.weeks,
    events: state.events,
    token: state.token
  };
}

function mapDispatchToProps(dispatch){
  return {
    CreateEvent: bindActionCreators(CreateEvent, dispatch),
    setToken: bindActionCreators(setToken, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);