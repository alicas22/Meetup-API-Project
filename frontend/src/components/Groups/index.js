import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getGroups } from '../../store/groups.js';
import { useModal } from "../../context/Modal";
import OpenModalButton from '../Modals/OpenModalButton';
import CreateGroupModal from '../Modals/CreateGroupModal'

const Groups = () => {
const dispatch = useDispatch()
const groupsObj = useSelector(state=> state.groups)
const groups = Object.values(groupsObj)
console.log('groups: ', groups)

useEffect(() => {
  dispatch(getGroups())
}, [])

  if (!groups) return null;
  return (
    <div>
        <ul>
            {groups.map((group) => (
                <li key = {group.id}>{group.name}</li>
            ))}
        </ul>
        <div className='modals'>
          <OpenModalButton
            buttonText="Create Group"
            modalComponent={<CreateGroupModal />}
          />
          </div>
    </div>
  );
};

export default Groups;
