import { useSelector } from 'react-redux'
import './Profile.css'


const Profile = () => {
    const sessionUser = useSelector(state => state.session.user);
    console.log('sessionUser', sessionUser)
    return (
        <>
            <div className="profile-container">
                <div className='profile-picture-info-container'>
                <button className='profile-picture'>
                    {sessionUser.firstName[0].toUpperCase()}
                </button>
                <div className='profile-info'>
                    {sessionUser.firstName} {sessionUser.lastName}
                </div>
                </div>
            </div>
        </>
    )
}

export default Profile
