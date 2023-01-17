import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getEvents } from '../../store/events.js';
import { useModal } from "../../context/Modal";
import OpenModalButton from '../Modals/OpenModalButton';
import CreateEventModal from '../Modals/CreateEventModal'

const Events = () => {
const dispatch = useDispatch()
const eventsObj = useSelector(state=> state.events)
const events = Object.values(eventsObj)

useEffect(() => {
  dispatch(getEvents())
}, [])

  if (!events) return null;
  return (
    <div>
        <ul>
            {events.map((event) => (
                <li key = {event.id}>{event.name}</li>
            ))}
        </ul>
        NEED TO MOVE THIS TO GROUPDETAILS PAGE
         <div className='modals'>
          <OpenModalButton
            buttonText="Create Event"
            modalComponent={<CreateEventModal />}
          />
          </div>
    </div>
  );
};

export default Events;
