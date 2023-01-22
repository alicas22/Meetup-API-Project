import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroupThunk } from "../../store/groups";
import { NavLink } from "react-router-dom";
import GroupDetailsAbout from './GroupDetailsAbout'
import './GroupDetails.css'


const GroupDetailsNavBar = () => {
    const dispatch = useDispatch()
    const { groupId } = useParams()
    // const group = useSelector((state => state.groups.singleGroup))
    const sessionUser = useSelector(state => state.session.user);


    return (
        <>
            <div className='group-details-center-divider'>
                <div className="group-details-navlink-about-container">
                    {/* <NavLink exact to={`/groups/${groupId}`} activeClassName="active" style={{ textDecoration: 'none' }} className="navlink-about"> */}
                        About
                    {/* </NavLink> */}
                </div>
                {/* <div className="group-details-navlink-events-container">
                    <NavLink to={`/groups/${groupId}/events`} activeClassName="active" style={{ textDecoration: 'none' }} className="navlink-events">
                        Events
                    </NavLink>
                </div> */}
            </div>
            {/* <GroupDetailsAbout /> */}
        </>
    )
}


export default GroupDetailsNavBar
