import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import './SplashPage.css'
function SplashPage() {

    return (
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


    )
}

export default SplashPage
