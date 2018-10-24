import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Calendar from './components/calendarComponent';
import Login from './components/loginComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadEvents, setDays } from './store/actions';
import formatNumber from './utils/formatNumber';

const DAY_AMOUNT = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class App extends Component {

  componentDidMount(){

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const weeks = [new Array(7)];
    for(let i = 1; i <= DAY_AMOUNT[month]; i++){
      const dateString = `${month+1}-${formatNumber(i, 2)}-${year}`;
      const thisDay = new Date(dateString);
      const day = thisDay.getDay();
      if(day % 7 === 0) weeks.push(new Array(7));
      weeks[weeks.length -1][day] = {
        date: dateString,
      };      
    }
    this.props.setDays(weeks);
    this.props.LoadEvents();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/calendar' component={Calendar} />
            <Route path='*' component={()=><Redirect to='/login' />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {};
}

function mapDispatchToProps(dispatch){
  return {
    LoadEvents: bindActionCreators(LoadEvents, dispatch),
    setDays: bindActionCreators(setDays, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
