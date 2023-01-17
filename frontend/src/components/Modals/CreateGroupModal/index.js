import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import './CreateGroup.css';
import { addGroupImageThunk, createGroup } from "../../../store/groups";
import { useParams } from 'react-router-dom'

function SignupFormModal() {
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
    const { groupId } = useParams()
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            name,
            about,
            type,
            privated,
            city,
            state
        }

        if (imageURL) {
            return dispatch(createGroup(payload))
                .then(dispatch(addGroupImageThunk({ url: imageURL, preview: true }, groupId)))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        } else {
            return dispatch(createGroup(payload))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }

    };

    return (
        <div className="create-group-container ">
            <img
                className="create-group-form-icon"
                src="https://resource.logitechg.com/w_659,c_limit,f_auto,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/og-fallback.jpg?v=1"
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

export default SignupFormModal;
