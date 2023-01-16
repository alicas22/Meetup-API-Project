import Groups from "../Groups";
import Events from "../Events"
import { Link } from "react-router-dom";


function EventsGroupsNav(){


    return(
        <div className="EventsGroupNav-container">
            <span className="EventsGroupsNav-Events">
            <Link to ='/events'>Events</Link>
            <Events />
            </span>
            <span className="EventsGroupsNav-Groups">
                <Link to ='/groups'>Groups</Link>
                <Groups />
            </span>
        </div>
    )
}
export default EventsGroupsNav
