import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroupThunk } from "../../store/groups";
import './GroupDetails.css'


const GroupDetailsAbout = () => {
    const dispatch = useDispatch()
    const { groupId } = useParams()
    const group = useSelector((state => state.groups.singleGroup))


    useEffect(() => {
        dispatch(getSingleGroupThunk(groupId))
    }, [dispatch])

    return (
        <>
            <div className='group-details-body'>
                <div className='group-details-about-text'>
                    {group.about}
                </div>
            </div>
        </>
    )
}


export default GroupDetailsAbout