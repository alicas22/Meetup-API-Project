import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import './SplashPage.css'
function SplashPage() {

    // const linkToEvent= ()=>{
    //     return(
    //         <NavLink to = './events' />
    //     )
    // }

    return (
        <>
            <div className='splash-page-container'>
                <div className='splash-page-header-container'>
                    <div className='text-container'>
                        <h1 className='header-quote'>
                            The people platform—Where interests become friendships
                        </h1>
                        <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—log in to join the fun.</p>
                    </div>
                    <img
                        className='splash-page-image'
                        src="https://secure.meetupstatic.com/next/images/shared/online_events.svg"
                        alt="group image"
                    />
                </div>
            </div>
            <div className='splash-page-link-container' >
                <NavLink to='/events'>
                    <div className='img-link1'>
                        <img
                            src="https://images.pexels.com/photos/280002/pexels-photo-280002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="army pic"
                            className='splash-page-link-img'
                        />
                        <span>
                            Make New Friends
                            <i className="fa-solid fa-arrow-right"></i>
                        </span>
                    </div>
                </NavLink>
                <NavLink to='/events'>
                    <div className='img-link2' >
                        <img
                            src="https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="office pic"
                            className='splash-page-link-img'
                        />
                        <span>
                            Connect Over Tech
                            <i className="fa-solid fa-arrow-right img-link2"></i>
                        </span>
                    </div>
                </NavLink>
                <NavLink to='/events'>
                    <div className='img-link3'>
                        <img
                            src="https://images.pexels.com/photos/1076081/pexels-photo-1076081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="hiking pic"
                            className='splash-page-link-img'
                        />
                        <span>
                            Explore the outdoors
                            <i className="fa-solid fa-arrow-right img-link3"></i>
                        </span>
                    </div>
                </NavLink>
            </div>
        </>

    )
}

export default SplashPage
