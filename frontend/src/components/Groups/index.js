import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroups } from '../../store/groups.js';

import './Groups.css'

const Groups = () => {
  const dispatch = useDispatch()
  const groupsObj = useSelector(state => state.groups.allGroups)
  const groups = Object.values(groupsObj)
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(getGroups())
  }, [dispatch])



  if (groups.length === 0) return null;

  let groupHeaderText = "Find groups near you" ;
  let isLoggedIn = false

  if(sessionUser) isLoggedIn = true

  if(isLoggedIn === false){
    groupHeaderText = "Find groups near you " + "(You must login to view details)"
  }

  return  (
    <div className='groups-container'>
      <h4 className='groups-header'>{groupHeaderText}</h4>
      <div className='groups-list'>
        {groups.map((group) => (
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

export default Groups;
