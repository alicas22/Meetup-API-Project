import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';
import { getGroups } from '../../store/groups.js';
import OpenModalButton from '../Modals/OpenModalButton';
import formatDate from '../../utils/formatDate'

import './SearchResults.css'

const EventResults = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGroups())
  }, [dispatch])

  const groupsObj = useSelector(state => state.groups.allGroups)
  const groups = Object.values(groupsObj)
  const sessionUser = useSelector(state => state.session.user);
  const eventResultsObj = useSelector((state) => state.search.Events)
  if (!eventResultsObj) return null

  const eventResultsArr = Object.values(eventResultsObj)
  if (!eventResultsArr.length) return <h1 className='search-title'></h1>

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
    const startDate = `${date.shortDayName}, ${date.shortMonth} ${date.day} ${date.year} ${date.time}`
    return startDate
  }

  let eventHeaderText = "Find events";

  if (!sessionUser) {
    eventHeaderText = "Find events " + "(You must login to view details)"
  }

  return (
    <div className='events-container event-results-container'>
      <h4 className='events-header'>{eventHeaderText}</h4>
      <div className='events-list'>
        {eventResultsArr.map((event) => (
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
  )
};

export default EventResults;
