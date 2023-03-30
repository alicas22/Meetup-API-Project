import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroupThunk } from "../../store/groups";
import { NavLink } from "react-router-dom";
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
                    <NavLink exact to={`/groups/${groupId}`} className="group-details-nav-option" activeClassName="active" style={{ textDecoration: 'none' }}>
                        About
                    </NavLink>
                </div>
                <div className="group-details-navlink-events-container">
                    <NavLink to={`/groups/${groupId}/events`} className="group-details-nav-option" activeClassName="active" style={{ textDecoration: 'none' }}>
                        Events
                    </NavLink>
                </div>
            </div>

        </>
    )
}


export default GroupDetailsNavBar
