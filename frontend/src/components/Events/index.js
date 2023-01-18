import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { getEvents } from '../../store/events.js';
import { useModal } from "../../context/Modal";
import OpenModalButton from '../Modals/OpenModalButton';
import CreateEventModal from '../Modals/CreateEventModal'
import './Events.css'

const Events = () => {
const dispatch = useDispatch()
const eventsObj = useSelector(state=> state.events)
const events = Object.values(eventsObj)

events.forEach((event) => {
  if (event.previewImage == "Preview not available" || event.previewImage == null) {
    event.previewImage = "data:image/png;base64,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"
  }
})

useEffect(() => {
  dispatch(getEvents())
}, [])

  if (!events) return null;
  return (
    <div className='events-container'>
      <div className='modals'>
        MOVE TO GROUP DETAILS PAGE
        <OpenModalButton
          buttonText="Create Event"
          modalComponent={<CreateEventModal />}
        />
      </div>
      <h4 className='events-header'>Find events near you</h4>
      <div className='events-list'>
        {events.map((event) => (
          <Link to={`/events/${event.id}`} style={{ textDecoration: "none" }} key={event.id} >
            <div className="single-event-container" >
              <img src={event.previewImage} alt={event.name} className="events-preview-image"></img>
              <div className='single-event-text-container'>
                <div className='event-name'>{event.name}  </div>
                <div className='event-city-state'>{event.city}, {event.state}</div>
                <div className='event-about'>{event.about}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Events;
