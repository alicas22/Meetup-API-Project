import React, { useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../Modals/OpenModalButton';
import LoginFormModal from '../Modals/LoginFormModal';
import SignupFormModal from '../Modals/SignupFormModal';
import './Navigation.css';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import CreateGroupModal from '../Modals/CreateGroupModal';
import { cleanUpSearchAction, thunkCreateSearch } from '../../store/search';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [query, setQuery] = useState('');
  const history = useHistory()

  const credential = 'Demo-lition'
  const password = 'password'

  const handleSubmit = (e) => {
    e.preventDefault();
   return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)

  };

  const handleSearch = async (e) => {
		e.preventDefault();

		dispatch(cleanUpSearchAction())
		dispatch(thunkCreateSearch(query))
		setQuery('')
		history.push('/search')
	};

	// const handleAutocomplete = (e) => {
	// 	const searchQuery = e.target.value;
	// 	setQuery(searchQuery);
	// 	const productsArr = Object.values(productsObj);
	// 	const results = productsArr.filter((product) => {
	// 		return product.name.toLowerCase().includes(searchQuery.toLowerCase());
	// 	});
	// 	setAutocompleteResults(results);
	// };


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-bar-right'>
        <div className='modal-create-group'>
        <OpenModalButton
          buttonText="Start a new group"
          modalComponent={<CreateGroupModal />}
        />
      </div>
      <div style = {{marginRight:'15px'}}>
        <ProfileButton user={sessionUser} />
      </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='button-container'>
        <div className='demo-login' onClick = {handleSubmit}>
          Demo Log In
        </div>
        <div className='modals-logged-out'>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </div>
        <div className='modals-logged-out'>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div >
    );
  }

  return (
    <div className='header-container'>
      <div className='home-button'>
        <NavLink exact to="/" activeClassName="not-going-to-be-active" style={{textDecoration: 'none', color:'red'}}>GitTogether</NavLink>
      </div>

      {/* search portion */}
      <div className='nav-bar-search-container'>
				<form onSubmit={handleSearch} className='nav-bar-search-form'>
					<div className="nav-bar-search-wrapper">
						<input
							placeholder="Search for keywords"
							className="nav-bar-search-text-field"
							type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
							// onChange={handleAutocomplete}
							// onBlur={() => setAutocompleteResults([])}

						/>

						<button type="submit" className="nav-bar-search-button">
							<i className="fa fa-search"></i>
						</button>
					</div>
					{/* {autocompleteResults.length > 0 && (
						<ul className="nav-bar-search-autocomplete">
							{autocompleteResults.map((result) => (
								<NavLink className='auto-search-link-item' to={`/products/${result.id}`} onClick={() => { setQuery(''); setAutocompleteResults([]) }}>
									<li className='auto-search-item' key={result.id}>{result.name}</li>
								</NavLink>
							))}
						</ul>
					)} */}
				</form>
			</div>
          {/* end of search */}

      <div className='login-signup'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
