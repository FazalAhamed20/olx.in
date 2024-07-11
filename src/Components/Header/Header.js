import React, { useContext,useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow1';
import Arrow2 from '../../assets/Arrow2';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/FirebaseContext';
import { getAuth, signOut } from 'firebase/auth';
import {useNavigate,Link}from 'react-router-dom'

function Header() {
  const [placeholder, setPlaceholder] = useState('India');
  const [isOpen,setIsOpen]=useState(false)
  const [lang,setLang]=useState('English')
  const {user}=useContext(AuthContext)
  const auth=getAuth()
  const navigate=useNavigate()
  const handleSignout=()=>{
    signOut(auth).then(()=>{
      navigate('/login')

    })
  }
  const handleDropdownItemClick = (item) => {
    
    console.log(`Clicked item: ${item}`);
    setPlaceholder(item)
  };
  const handleDropdownItemClick2 = (item) => {
    
    console.log(`Clicked item: ${item}`);
    setLang(item)
  };
  function Account() {
   
  setIsOpen(!isOpen)
  }
 

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <Link to='/'>
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>

        </Link>
        
        <div className="placeSearch">
          <Search></Search>
          <input type="text"
          placeholder={placeholder} />
         <Arrow onDropdownItemClick={handleDropdownItemClick} />

        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find Car,Mobile Phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span > {lang}</span>
          <Arrow2 onDropdownItemClick2={handleDropdownItemClick2} />
        </div>
        <div className="loginPage">
      {user ? (
      
        <>
          <span onClick={Account} className='Username'>{user.displayName}</span>
          {isOpen && (
            <Link to='/saved'>
        <div className="dropdown-content">
          <p >Favourites</p>
         
        </div>
        </Link>
      )}
          <hr />
        </>
      ) : (
        
        <a className='Login' href="/login">Login</a>
      )}
    </div>
        {user && <span className='Logout' onClick={handleSignout}>Logout</span>}
        <Link to='/create'>
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>

       
      </div>
    </div>
  );
}

export default Header;
