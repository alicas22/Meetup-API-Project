
import { NavLink } from "react-router-dom";
import './EventsGroupsNav.css'


function EventsGroupsNav() {



    return (
        <div className="EventsGroupNav-container">
            <div className="EventsGroupsNav-events">
                <NavLink to='/events' activeClassName="active" style={{ textDecoration: 'none'}} className="navlink-events">Events</NavLink>
            </div>
            <div className="EventsGroupsNav-groups">
                <NavLink to='/groups' activeClassName="active" style={{ textDecoration: 'none'}} className= "navlink-groups">Groups</NavLink>
            </div>
        </div>
    )
}
export default EventsGroupsNav
