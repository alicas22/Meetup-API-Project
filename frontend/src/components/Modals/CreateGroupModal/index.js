import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import './CreateGroup.css';
import { createGroup } from "../../../store/groups";
import { useHistory } from 'react-router-dom'

function CreateGroupModal() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [type, setType] = useState("");
    const [privated, setPrivated] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)

    const handleSubmit =  (e) => {
        e.preventDefault();
        setErrors([]);
        const group = {
            name,
            about,
            type,
            private: privated,
            city,
            state
        }

        const newGroupImage = {
            url: imageURL,
            preview: true
        }
        return dispatch(createGroup(group, newGroupImage, sessionUser))
            .then((newGroup) => {
                history.push(`/groups/${newGroup.id}`)
                closeModal()
            })
            .catch(async (res) => {
                const data = await res.json;
                if (data && data.errors) setErrors(data.errors);
            })


    };

    return (
        <div className="create-group-container ">
            <img
                className="create-group-form-icon"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLxuHMX3PPsXyTanvhUj2POWJLhON6SfVd3lJNxfcyQsV03uSSXhKx97JonQ5-znzut2s&usqp=CAU"
                alt="logo"
            />
            <h1>Create Group</h1>
            <form onSubmit={handleSubmit} className='create-group-form'>
                <ul className="validation-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    About
                    <textarea
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                        className="text-about"
                    />
                </label>
                <label>
                    Type
                </label>
                <select
                    name='type'
                    onChange={e => setType(e.target.value)}
                    value={type}
                    required
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
                    value={privated}
                    onChange={(e) => setPrivated(e.target.value)}
                    required
                >
                    <option value='' disable selected>Is Group Private?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <div></div>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image
                    <input
                        type="url"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        required
                        placeholder="https://example.com"
                    />
                </label>
                <button type="submit" className="create-group-form-button">Create Group</button>
            </form>
        </div>
    );
}

export default CreateGroupModal;
