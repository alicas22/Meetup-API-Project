import Groups from "../Groups";
import Events from "../Events"
import { NavLink } from "react-router-dom";
import './EventsGroupsNav.css'


function EventsGroupsNav() {



    return (
        <div className="EventsGroupNav-container">
            <span className="EventsGroupsNav-events">
                <NavLink to='/events' activeClassName="active" style={{ textDecoration: 'none' }}>Events</NavLink>
            </span>
            <span className="EventsGroupsNav-groups">
                <NavLink to='/groups' activeClassName="active" style={{ textDecoration: 'none' }}>Groups</NavLink>
            </span>
        </div>
    )
}
export default EventsGroupsNav
