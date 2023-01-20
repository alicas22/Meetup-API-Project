import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { getEvents } from '../../store/events.js';
import { getGroups } from '../../store/groups.js';
import { useModal } from "../../context/Modal";
import OpenModalButton from '../Modals/OpenModalButton';
import formatDate from '../../utils/formatDate.js';

import './Events.css'

const Events = () => {
  const dispatch = useDispatch()
  const groupsObj = useSelector(state => state.groups.allGroups)
  const groups = Object.values(groupsObj)
  const eventsObj = useSelector(state => state.events.allEvents)
  const events = Object.values(eventsObj)
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(getEvents())
    dispatch(getGroups())
  }, [dispatch])

  let groupName
  let groupCity
  let groupState
  const findGroupName = (eventId) => {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].id === eventId) {
        groupName = groups[i].name
      }
    }
    return groupName
  }
  const findGroupCity = (eventId) => {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].id === eventId) {
        groupCity = groups[i].city
      }
    }
    return groupCity
  }
  const findGroupState = (eventId) => {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].id === eventId) {
        groupState = groups[i].state
      }
    }
    return groupState
  }

  const formatStartDate = (eventDate) => {
    const date = formatDate(eventDate)
    const startDate = `${date.dayName}, ${date.shortMonth} ${date.time}`
    return startDate
  }

  if (!events.length || !groups.length ||
    events.length < 1 || groups.length < 1) return null;

  let eventHeaderText = "Find events near you";
  let isLoggedIn = false

  if (sessionUser) isLoggedIn = true

  if (isLoggedIn === false) {
    eventHeaderText = "Find events near you " + "(You must login to view details)"
  }


  return groups && events && (
    <div className='events-container'>

      <h4 className='events-header'>{eventHeaderText}</h4>
      <div className='events-list'>
        {events.map((event) => (
          <Link to={`/events/${event.id}`} style={{ textDecoration: "none" }} key={event.id} >
            <div className="single-event-container" >
              <img src={event.previewImage} alt={event.name} className="events-preview-image"></img>
              <div className='single-event-text-container'>
                <div class className="event-time">{formatStartDate(event.startDate)}</div>
                <h2 className='event-name'>{event.name}  </h2>
                <div className='event-city-state'> {findGroupName(event.id)} - {findGroupCity(event.id)}, {findGroupState(event.id)}</div>
                <div className='event-attendees'>{event.numAttending} attendees &#x2022; {groups[event.groupId]?.private === true ? 'Private' : "Public"}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Events;
