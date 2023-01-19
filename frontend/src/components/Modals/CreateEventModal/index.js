import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import './CreateEvent.css';
import { addEventImageThunk, createEvent } from "../../../store/events";
import { useParams } from 'react-router-dom'

function CreateEventModal() {
    const dispatch = useDispatch();
    const [venueId, setVenueId] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const { eventId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            venueId,
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate
        }

        if(imageURL){
        return dispatch(createEvent(payload))
            .then(dispatch(addEventImageThunk({url:imageURL, preview:true}, eventId)))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        }else{
            return dispatch(createEvent(payload))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });

        }
    };

    return (
        <div className="create-event-container">
            <img
                className="create-event-form-icon"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLxuHMX3PPsXyTanvhUj2POWJLhON6SfVd3lJNxfcyQsV03uSSXhKx97JonQ5-znzut2s&usqp=CAU"
                alt="logo"
            />
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit} className='create-event-form'>
                <ul className="validation-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Venue
                </label>
                <select
                    name='venue'
                    onChange={e => setVenueId(e.target.value)}
                    value={venueId}
                >
                    <option value='' disable selected>Select an venue...</option>
                    <option value='1'>1: test venue 1</option>
                    <option value='2'>2: test venue 2</option>
                    <option value='3'>3: test venue 3</option>
                </select>
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
                    Type
                </label>
                <select
                    name='type'
                    onChange={e => setType(e.target.value)}
                    value={type}
                >
                    <option value='' disable selected>Select an event type...</option>
                    <option value='Online'>Online</option>
                    <option value='In person'>In Person</option>
                </select>
                <label>
                    Description
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="text-about"
                    />
                </label>
                <label>
                    Capacity
                    <input
                    type ="number"
                    min="0"
                    value = {capacity}
                    onChange ={(e)=>setCapacity(e.target.value)}
                    placeholder = "0"
                    step = "1"
                    />
                </label>
                <label>
                    Price
                    <input
                    type ="number"
                    min="0"
                    value = {price}
                    onChange ={(e)=>setPrice(e.target.value)}
                    placeholder = "0.00"
                    step = "0.01"
                    />
                </label>
                <label>
                    Start Date
                    <input
                    type ="datetime-local"
                    value = {startDate}
                    onChange ={(e)=>setStartDate(e.target.value)}

                    />
                </label>
                <label>
                    End Date
                    <input
                    type ="datetime-local"
                    value = {endDate}
                    onChange ={(e)=>setEndDate(e.target.value)}
                    />
                </label>


                <button type="submit" className="create-event-form-button">Create Event</button>
            </form>
        </div>
    );
}

export default CreateEventModal;
