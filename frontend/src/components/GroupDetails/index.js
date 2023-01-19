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


    useEffect(() => {
        dispatch(getSingleGroupThunk(groupId))
    }, [dispatch])


    if (!group) return null
    return (
        <div className="group-details-container">
            <div className='group-details-header'>
                {group.GroupImages && (<img src={group.GroupImages[0].url} className="group-details-header-image" />)}
                <div className='group-details-info-container'>
                    <h1 className='group-details-name'>{group.name}</h1>
                    <div className='group-details-city-state'>
                        <i className="fa-solid fa-location-dot"></i>
                        {group.city}, {group.state}</div>
                    <div className='group-details-members-info'>
                        <i className="fa-solid fa-users"></i>
                        {group.numMembers} members &#x2022; {group.private ? 'Private' : "Public"}
                    </div>
                    <div className="group-details-organized-by">
                        <i className="fa-solid fa-user"></i>

                    </div>
                    <div className='group-details-crud'>
                        <div className='group-details-update-group'>
                            <OpenModalButton
                                buttonText="Update Group"
                                modalComponent={<UpdateGroupModal prop={group} />}
                            />
                        </div>
                        <div className='modals-logged-out'>
                            <OpenModalButton
                                buttonText="Delete Group"
                                modalComponent={<DeleteGroupModal />}
                            />
                        </div>
                        <div className='modals'>

                            <OpenModalButton
                                buttonText="Create Event"
                                modalComponent={<CreateEventModal />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;
