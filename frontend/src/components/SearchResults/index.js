//This is the search header component
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import './SearchResults.css'


function SearchResults() {
    const history = useHistory()
    const searchRes = useSelector((state) => state.search);
    const groupResultsObj = useSelector((state) => state.search.Groups);
    const eventResultsObj = useSelector((state) => state.search.Events);

    const groupResultsArr = Object.values(groupResultsObj);
    const eventResultsArr = Object.values(eventResultsObj);

    useEffect(() => {
        if (!eventResultsArr.length && !groupResultsArr.length) {
            history.push('/search/events')
        } else if (!eventResultsArr.length && groupResultsArr.length) {
            history.push('/search/groups')
        }
    }, [eventResultsArr, groupResultsArr]);


    if (!groupResultsArr.length && !eventResultsArr.length) {
        return (
            <>
                <h1 className="search-results-header">No Events or Groups match your search criteria</h1>
                <h3 className="search-results-header">Try some favorites like "beach" or "party"</h3>
            </>
        )
    }

    return (
        <div>
            <h2 className="search-results-header">
                {eventResultsArr.length && groupResultsArr.length
                    ? "Here are your search results:"
                    : eventResultsArr.length
                        ? "Here are your search results for events:"
                        : groupResultsArr.length
                            ? "Here are your search results for groups:"
                            : "No Events or Groups Match your search criteria"
                }
                <br />
                {(!eventResultsArr.length && groupResultsArr.length) && "(no events matched your search criteria)"}
                {(!groupResultsArr.length && eventResultsArr.length) && "(no groups matched your search criteria)"}
            </h2>
            <div className="EventsGroupNav-container">
                {eventResultsArr.length > 0 && (
                    <div className="EventsGroupsNav-events">
                        <NavLink to='/search/events' activeClassName="active" style={{ textDecoration: 'none' }} className="navlink-events">Events</NavLink>
                    </div>
                )}
                {groupResultsArr.length > 0 && (
                    <div className="EventsGroupsNav-groups">
                        <NavLink to='/search/groups' activeClassName="active" style={{ textDecoration: 'none' }} className="navlink-groups">Groups</NavLink>
                    </div>
                )}
            </div>
        </div>

    )
}
export default SearchResults
