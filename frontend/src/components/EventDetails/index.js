import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router"
import { getSingleEventThunk } from "../../store/events"
import { getGroups, getSingleGroupThunk } from "../../store/groups"
import DeleteEventModal from "../Modals/DeleteEventModal"
import { Link } from 'react-router-dom'
import './EventDetails.css'
import OpenModalButton from '../Modals/OpenModalButton/index.js';
import formatDate from '../../utils/formatDate.js';

const EventDetails = () => {
    const dispatch = useDispatch()
    const { eventId } = useParams()
    const event = useSelector(state => state.events.singleEvent)
    const group = useSelector(state => state.groups.singleGroup)
    const sessionUser = useSelector(state => state.session.user);

    const asyncEventGet = async()=> {
        const singleEvent = await dispatch(getSingleEventThunk(eventId))
        if (singleEvent) {
            dispatch(getSingleGroupThunk(singleEvent.groupId))
        }
    }

    useEffect(() => {
        asyncEventGet()
    }, [dispatch, sessionUser])


    const formattedDate = (eventDate) => {
        const dateObj = formatDate(eventDate)
        const date = `${dateObj.dayName}, ${dateObj.month} ${dateObj.year} at ${dateObj.time}`
        return date
      }

    if (!event.id && !group.id) return null

    if (!sessionUser) return (
        <div style={{textAlign:'center'}}>
            <h1>You must login to view Details</h1>
        </div>
    )
    return group.Organizer && event.Venue &&(
        <div className="event-details-container">
            <div className="event-details-header-container">
                <h1 className="event-details-name">
                    {event.name}
                </h1>
                <div className="event-details-hosted-by">
                    <i className="fa-solid fa-users-rectangle"></i>
                    <div className="event-details-hosted-by-text">
                        <div className="event-details-text-indent">Hosted by:</div>
                        <div className="event-details-text-indent"> {group.Organizer?.firstName} </div>
                    </div>
                </div>
                <div className="event-details-modals-container">

                    <div className='event-detail-delete-modal'>
                        <OpenModalButton
                            buttonText="Delete Event"
                            modalComponent={<DeleteEventModal />}
                        />
                    </div>
                </div>
            </div>
            <div className="event-details-border"></div>
            <div className="event-details-main-body">
                <div className="event-details-image-card-container">
                    <div className="event-details-image-container">
                        {event.EventImages && (<img src={event.EventImages[0]?.url} className="event-details-image" />)}
                    </div>
                    <div className="event-details-group-info-event-info-container">
                        <Link to={`/groups/${group.id}`} style={{ textDecoration: 'none' }}>
                            <div className="event-details-info-card">
                                <img src={group.GroupImages[0].url} alt="" className="event-details-group-image" />
                                <div className="event-details-info-card-group-info">{group.name}
                                    <div className="event-details-info-card-group-private">{group.private ? "Private" : "Public"} group
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="event-info-time-date-location">
                            <div className="clock-date-time"><i className="fa-regular fa-clock" />
                                <p className="event-details-text-indent"> {formattedDate(event.startDate)} to {formattedDate(event.endDate)}</p></div>
                            <div className="event-details-venue-location"><i className="fa-solid fa-location-dot" />
                                <p className="event-details-text-indent">  {event.Venue?.address}, {event.Venue?.city}, {event.Venue?.state}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="event-details-about-container">
                    <div className="event-details-about-details">
                        Details
                    </div>
                    <div className="event-details-about-details-text">{event.description}</div>
                </div>
            </div>

        </div >
    )
}

export default EventDetails
