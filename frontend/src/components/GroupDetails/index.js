import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getGroups } from '../../store/groups.js';
import { getSingleGroupThunk } from '../../store/groups.js';
// import './GroupDetails.css'

const GroupDetails = () => {
    const dispatch = useDispatch()
    const { groupId } = useParams()
    const group = useSelector((state => state.groups.singleGroup))

    useEffect(() => {
        dispatch(getGroups())
        dispatch(getSingleGroupThunk(groupId))
    }, [])



    console.log("group: ", group)
    console.log("group: ", group.id)


    return (
        <div className="group-details-container">
            <div className='group-details-header'>
                hello
                {/* <img src={group.GroupImages[0].url} className="header-image"/> */}
                {/* <h2 className='group-details-name'>{group.name}</h2> */}
            </div>
        </div>
    )
}

export default GroupDetails;
