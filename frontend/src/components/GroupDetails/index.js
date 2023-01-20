import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getGroups } from '../../store/groups.js';
import { getSingleGroupThunk } from '../../store/groups.js';
import CreateEventModal from '../Modals/CreateEventModal/index.js';
import UpdateGroupModal from '../Modals/UpdateGroupModal/index.js';
import DeleteGroupModal from '../Modals/DeleteGroupModal/index.js';
import OpenModalButton from '../Modals/OpenModalButton/index.js';
import './GroupDetails.css'

const GroupDetails = () => {
    const dispatch = useDispatch()
    const { groupId } = useParams()
    const group = useSelector((state => state.groups.singleGroup))
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSingleGroupThunk(groupId))
    }, [dispatch, sessionUser])

    if (group === undefined) return null

    if (!sessionUser) return (
        <div style={{textAlign:'center'}}>
            <h1>You must login to view Details</h1>
        </div>
    )
    return group && (
        <div className="group-details-container">
            <div className='group-details-header'>
                {group.GroupImages && (<img src={group.GroupImages[0].url} className="group-details-header-image" />)}
                <div className='group-details-info-container'>
                    <h1 className='group-details-name'>{group.name}</h1>
                    <div className='group-details-city-state'>
                        <i className="fa-solid fa-location-dot"></i>
                        <span className="group-details-indent1">{group.city}, {group.state}</span></div>
                    <div className='group-details-members-info'>
                        <i className="fa-solid fa-users"></i>
                        <span className="group-details-indent2"> {group.numMembers} members &#x2022; {group.private ? 'Private' : "Public"}</span>
                    </div>
                    <div className="group-details-organized-by">
                        <i className="fa-solid fa-user"></i>
                        <span className="group-details-indent3">Organized by {group.Organizer?.firstName} {group.Organizer?.lastName}</span>
                    </div>
                    <div className='group-details-crud'>
                        <div className='group-details-create-event'>

                            <OpenModalButton
                                buttonText="Create Event"
                                modalComponent={<CreateEventModal />}
                            />
                        </div>
                        <div className='group-details-update-group'>
                            <OpenModalButton
                                buttonText="Update Group"
                                modalComponent={<UpdateGroupModal prop={group} />}
                            />
                        </div>
                        <div className='group-details-delete-group'>
                            <OpenModalButton
                                buttonText="Delete Group"
                                modalComponent={<DeleteGroupModal />}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='group-details-center-divider'>About</div>
            <div className='group-details-body'>
                <div className='group-details-about-text'>
                    {group.about}
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;
