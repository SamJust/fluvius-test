import React from 'react';
import Event from '../components/eventComponent';

class Day extends React.Component{
  render(){
    if(!this.props.day) return <div className='day' />;
    const { date, events } = this.props.day;
    const filteredEvents = events.filter(event => event.date === date);
    const dayClass = `day ${filteredEvents.length > 0 && 'busy-day'}`
    return(
      <div className={dayClass}>
        { date }
        { filteredEvents.map(event => (<Event key={event._id} event={event} />)) }
      </div>
    );
  }
}

export default Day;