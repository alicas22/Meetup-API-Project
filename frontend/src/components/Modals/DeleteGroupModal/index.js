import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
// import './UpdateGroup.css';
import { deleteGroup } from "../../../store/groups";
import { getEvents } from "../../../store/events";


function DeleteGroupModal() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const groupId = useSelector(state => state.groups.singleGroup.id)
    const organizerId = useSelector(state => state.groups.singleGroup.organizerId)
    const sessionUser = useSelector(state => state.session.user);
    // const eventsObj = useSelector(state => state.events.allEvents)
    // const events = Object.values(eventsObj)
    const history = useHistory()

    // useEffect(() => {
    //     dispatch(getEvents())
    //   }, [dispatch])


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(deleteGroup(groupId))
        // .then(()=>dispatch(getEvents()))
            .then(() => {
                closeModal()
                history.push('/groups')
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && organizerId !== sessionUser.id) setErrors(["You are not authorized to do this operation"]);

            })

    };
    return (
        <div className="create-group-container ">
            <img
                className="create-group-form-icon"
                src="data:image/png;base64,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"
                alt="logo"
            />
            <h2>Are you sure you want to delete this group?</h2>
            <form onSubmit={handleSubmit} className='create-group-form'>
                <ul className="validation-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <button type="submit" className="create-group-form-button">Permanently Delete Group</button>
            </form>
        </div>
    );
}

export default DeleteGroupModal;
