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
            <img src="https://secure.meetupstatic.com/next/images/blobs/red-blob.svg" alt='light-red-blob' id="light-red-blob" />
            <img src="https://secure.meetupstatic.com/next/images/blobs/yellow-blob.svg" alt='light-yellow-blob' id="light-yellow-blob" />
            <img src="https://secure.meetupstatic.com/next/images/blobs/green-blob.svg" alt='light-green-blob' id="light-green-blob" />
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
            <div className='splash-page-link-container'  >
                <NavLink to='/events' style ={{textDecoration:"none"}}>
                    <div className='img-link' >
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
                <NavLink to='/events' style ={{textDecoration:"none"}}>
                    <div className='img-link' >
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
                <NavLink to='/events' style ={{textDecoration:"none"}}>
                    <div className='img-link'>
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
            <div className='how-it-works-subtitle'>
                <h3>How GitTogether Works</h3>
                <p>Meet new people who share your interests through online and in-person events. It's free to create an account.</p>
            </div>
            <div className='mid-page-group-links'>
                <NavLink to='/groups' style ={{textDecoration:"none"}}>
                <div className='mid-page'>
                    <img src = "https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256" alt= "" />
                    <div className='mid-page-link-header'>Join a Group</div>
                    <div className='mid-page-link-subtitle'>Do what you love, meet others who love it, find your community. The rest is history!</div>
                </div>
                </NavLink>
                <NavLink to='/events' style ={{textDecoration:"none"}}>
                <div className='mid-page'>
                    <img src = "https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256" alt= "" />
                    <div className='mid-page-link-header'>Find an Event</div>
                    <div className='mid-page-link-subtitle'>Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</div>
                </div>
                </NavLink>
                <NavLink to='/groups' style ={{textDecoration:"none"}}>
                <div className='mid-page'>
                    <img src = "https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256" alt= "" />
                    <div className='mid-page-link-header'>Explore Groups</div>
                    <div className='mid-page-link-subtitle'>You don't have to be an expert to gather people together and explore shared interests.</div>
                </div>
                </NavLink>
            </div>
        </>

    )
}

export default SplashPage
