import React from 'react';
import { Form, Label, FormGroup, Input, Button, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login as LoginAction } from '../store/actions';

// eslint-disable-next-line
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class Login extends React.Component{

  state = {
    email: '',
    password: '',
    error: null
  }

  handleButtonClick = event =>{
    event.preventDefault();
    const { email, password } = this.state;
    if(!emailRegEx.test(email)){
      return this.setState({
        error: 'This must be an email...'
      });
    }
    this.props.Login({ 
      email,
      password
    });
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render(){
    if(this.props.token) return <Redirect to='/calendar' />
    return(
      <div>
        <Form>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input id='email' type='email' name='email' onChange={this.handleInputChange} />
            {this.state.error && <Alert color='danger'>
              This must be an email
            </Alert>}
            <Label for='password'>Password</Label>
            <Input id='password' name='password' type='password' onChange={this.handleInputChange} />
            <Button onClick={this.handleButtonClick} type='primary'>Login</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    token:state.token
  };
}

function mapDispatchToProps(dispatch){
  return {
    Login: bindActionCreators(LoginAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
