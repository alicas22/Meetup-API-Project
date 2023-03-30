import image from './404.jpg'
import {NavLink} from 'react-router-dom'
import './PageNotFound.css'
function PageNotFound() {
    return (

        <div className="page-not-found-container">
            <div className='header-and-image-container'>
                <div className='page-not-found-header'>
                    We can't find the page you're looking for.
                    Try navigating from our
                    <NavLink to='/'
                    style = {{marginLeft:"10px", cursor:'pointer', textDecoration:"none"}}>homepage</NavLink>.
                </div>
                <div className="page-not-found-image">
                    <img src={image} alt="404 Error" className="centered-img" />
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
