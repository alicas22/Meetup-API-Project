import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroupThunk } from "../../store/groups";
import './GroupDetails.css'
import { getGroupMembers } from "../../store/members";


const GroupDetailsAbout = () => {
    const dispatch = useDispatch()
    const { groupId } = useParams()
    const group = useSelector((state => state.groups.singleGroup))
    const sessionUser = useSelector(state => state.session.user);
    const membersObj = useSelector(state => state.members.members)
    console.log('MEMBERS OBJECT', membersObj)

    useEffect(() => {
        dispatch(getSingleGroupThunk(groupId))
        dispatch(getGroupMembers(groupId))
    }, [dispatch])

    if (!membersObj) return null

    const membersArr = Object.values(membersObj)

    return sessionUser && (
        <>
            <div className='group-details-body'>
                <div className='group-details-about-text' style={{ paddingTop: "2rem" }}>
                    {group.about}
                </div>
                <div className="group-details-members-container">
                   <span className="group-details-members-header">Members</span>
                    <div className="group-details-member-card-container">
                        {membersArr.map(member => (
                            <div className="group-details-attendee-card">
                                <i class="fa-solid fa-user group-details-user-icon"></i>
                                <div className="group-details-member-names">
                                    {`${member.firstName} ${member.lastName}`}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}


export default GroupDetailsAbout
