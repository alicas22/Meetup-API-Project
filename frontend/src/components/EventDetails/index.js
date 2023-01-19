import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router"
import { getSingleEventThunk } from "../../store/events"
import { getGroups } from "../../store/groups"
import DeleteEventModal from "../Modals/DeleteEventModal"

import OpenModalButton from '../Modals/OpenModalButton/index.js';

const EventDetails = () => {
    const dispatch = useDispatch()
    const { eventId } = useParams()
    const event = useSelector(state => state.events.singleEvent)
    const group = useSelector(state => state.groups.allGroups[event.groupId])

    useEffect(() => {
        dispatch(getSingleEventThunk(eventId))
        dispatch(getGroups())
    }, [dispatch])

    if (event == undefined || group == undefined) return null
    return (
        <div className="event-details-container">
            <div className="event-details-header-container">
                <h1 className="event-details-name">
                    {event.name}
                </h1>
                <div className="event-details-hosted-by">
                <i className="fa-solid fa-users-rectangle"></i>
                    <div>Hosted By</div>
                    <div> {group.name}</div>
                </div>
                <div className="event-modals-container">
                
                        <div className='modals-logged-out'>
                            <OpenModalButton
                                buttonText="Delete Event"
                                modalComponent={<DeleteEventModal />}
                            />
                        </div>
                </div>
            </div>
        <div className="event-details-border"></div>
            <div className="event-details-main-body">
                <div className="event-details-image">
                {/* {event.EventImages && (<img src={event.EventImages[0].url} className="event-details-image" />)} */}
                </div>
            </div>
        </div>
    )
}

export default EventDetails
