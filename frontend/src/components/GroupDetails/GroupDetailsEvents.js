import { useParams, Link } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GroupDetails.css'
import { getGroupsEvents } from "../../store/events";
import formatDate from '../../utils/formatDate.js';

const GroupDetailsEvents = () => {
    const dispatch = useDispatch()
    const { groupId } = useParams()
    // const group = useSelector((state => state.groups.singleGroup))
    const sessionUser = useSelector(state => state.session.user);
    const groupEventsObj = useSelector(state => state.events.allEvents)


    useEffect(() => {
        dispatch(getGroupsEvents(groupId))
    }, [dispatch])

    if (!groupEventsObj) return null

    const groupEvents = Object.values(groupEventsObj)

    const formatStartDate = (eventDate) => {
        const date = formatDate(eventDate)
        const startDate = `${date.shortDayName}, ${date.shortMonth} ${date.day}, ${date.year} ${date.time}`
        return startDate
    }


    return sessionUser && (
        <>
            <div className='group-details-events-body'>
                {groupEvents.map((event) => (
                    <Link to={`/events/${event.id}`} style={{ textDecoration: "none" }} key={event.id} >
                        <div className="group-details-events-card">
                            <div className="group-details-events-card-details">
                                <img className="events-preview-image" src={event.previewImage} />
                            </div>
                            <div className="group-details-events-date-name-container">
                                <div className="group-detials-events-card-date">
                                    {formatStartDate(event.startDate)}
                                </div>
                                <div className="group-details-events-card-name">
                                    {event.name}
                                </div>
                                <div className="group-details-events-card-attendees">
                                    {event.numAttending} attendees
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}


export default GroupDetailsEvents
