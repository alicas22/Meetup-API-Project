import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroupThunk } from "../../store/groups";
import './GroupDetails.css'


const GroupDetailsAbout = () => {
    const dispatch = useDispatch()
    const { groupId } = useParams()
    const group = useSelector((state => state.groups.singleGroup))
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getSingleGroupThunk(groupId))
    }, [dispatch])


    return sessionUser && (
        <>
            <div className='group-details-body'>
                <div className='group-details-about-text' style = {{paddingTop:"2rem"}}>
                    {group.about}
                </div>
            </div>
        </>
    )
}


export default GroupDetailsAbout
