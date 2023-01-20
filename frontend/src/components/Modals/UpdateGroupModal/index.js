import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
// import './UpdateGroup.css';
import { addGroupImageThunk, updateGroup } from "../../../store/groups";
import { useHistory } from 'react-router-dom'

function UpdateGroupModal(props) {
    const dispatch = useDispatch();
    const [updateName, setUpdateName] = useState(props.prop.name);
    const [updateAbout, setUpdateAbout] = useState(props.prop.about);
    const [updateType, setUpdateType] = useState(props.prop.type);
    const [updatePrivated, setUpdatePrivated] = useState(props.prop.private);
    const [updateCity, setUpdateCity] = useState(props.prop.city);
    const [updateState, setUpdateState] = useState(props.prop.state);
    // const [imageURL, setImageURL] = useState("");
    const [updateErrors, setUpdateErrors] = useState([]);
    const { closeModal } = useModal();
    const groupId = useSelector(state => state.groups.singleGroup.id)
    const organizerId = useSelector(state => state.groups.singleGroup.organizerId)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    console.log('initial useState', updateName, updateAbout, updateType, updatePrivated)

    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdateErrors([]);
        const group = {
            name: updateName,
            about: updateAbout,
            type: updateType,
            private: updatePrivated,
            city: updateCity,
            state: updateState
        }
        console.log('group from updateGroupModal', group)
        const updatedGroup = dispatch(updateGroup(groupId, group, sessionUser))
            .then((newGroup) => {
                history.push(`/groups/${newGroup.id}`)
                closeModal()
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setUpdateErrors(data.errors);
                if (data && organizerId !== sessionUser.id) setUpdateErrors(["You are not authorized to do this operation"]);
            })


    };

    return (
        <div className="create-group-container ">
            <img
                className="create-group-form-icon"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLxuHMX3PPsXyTanvhUj2POWJLhON6SfVd3lJNxfcyQsV03uSSXhKx97JonQ5-znzut2s&usqp=CAU"
                alt="logo"
            />
            <h1>Update Group</h1>
            <form onSubmit={handleSubmit} className='create-group-form'>
                <ul className="validation-errors">
                    {updateErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Name
                    <input
                        type="text"
                        value={updateName}
                        onChange={(e) => setUpdateName(e.target.value)}

                    />
                </label>
                <label>
                    About
                    <textarea
                        type="text"
                        value={updateAbout}
                        onChange={(e) => setUpdateAbout(e.target.value)}
                        className="text-about"
                    />
                </label>
                <label>
                    Type
                </label>
                <select
                    name='type'
                    onChange={e => setUpdateType(e.target.value)}
                    value={updateType}
                >
                    <option value='' disable selected>Select a group type...</option>
                    <option value='Online'>Online</option>
                    <option value='In person'>In Person</option>
                </select>
                <label>
                    Private
                </label>
                <select
                    name='privated'
                    value={updatePrivated}
                    onChange={(e) => setUpdatePrivated(e.target.value)}
                >
                    <option value='' disable selected>Is Group Private?</option>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <div></div>
                <label>
                    City
                    <input
                        type="text"
                        value={updateCity}
                        onChange={(e) => setUpdateCity(e.target.value)}
                    />
                </label>
                <label>
                    State
                    <input
                        type="state"
                        value={updateState}
                        onChange={(e) =>  setUpdateState(e.target.value)}
                    />
                </label>
                {/* <label>
                    Image
                    <input
                        type="url"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}

                        placeholder="https://example.com"
                    />
                </label> */}
                <button type="submit" className="create-group-form-button">Update Group</button>
            </form>
        </div>
    );
}

export default UpdateGroupModal;
