import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';

import OpenModalButton from '../Modals/OpenModalButton';
import formatDate from '../../utils/formatDate'

import './SearchResults.css'

const GroupResults = () => {
  const sessionUser = useSelector(state => state.session.user);
  // const searchRes=useSelector((state) => state.search)
  const groupResultsObj = useSelector((state) => state.search.Groups)
  // const eventResultsObj = useSelector((state) => state.search.Events)
  // if (!searchRes) return null

  const groupResultsArr = Object.values(groupResultsObj)

  if (!groupResultsArr.length) return <h1 className='search-title'></h1>

  let groupHeaderText = "Find groups";

  if (!sessionUser) {
    groupHeaderText = "Find groups " + "(You must login to view details)"
  }

  return (
    <div className='groups-container group-results-container'>
      <h4 className='groups-header'>{groupHeaderText}</h4>
      <div className='groups-list'>
        {groupResultsArr.map((group) => (
          <Link to={`/groups/${group.id}`} style={{ textDecoration: "none" }} key={group.id} >
            <div className="single-group-container" >
              <img src={group.previewImage} alt={group.name} className="groups-preview-image"></img>
              <div className='single-group-text-container'>
                <h2 className='group-name'>{group.name}  </h2>
                <div className='group-city-state'>{group.city}, {group.state}</div>
                <div className='group-about'>{group.about}</div>
                <div className='group-number-members'>{group.numMembers} members &#x2022; {group.private ? 'Private' : "Public"}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GroupResults;
