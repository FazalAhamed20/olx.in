import React,{useEffect,useState,useContext} from 'react';
import { collection,getDocs,getFirestore,query,where } from 'firebase/firestore';

import './View.css';
import { PostContext } from '../../store/PostContext';
function View() {
  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(PostContext)
  const db=getFirestore()
  const {userId}=postDetails
  useEffect(() => {
    const fetchUser = async () => {
      try {
       
        const q = query(collection(db, 'users'), where('id', '==', userId));
        const querySnapshot = await getDocs(q);
  
        
        querySnapshot.forEach((doc) => {
         
          setUserDetails(doc.data())
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
   
    fetchUser();
  
   
  }, [userId, db]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        
        {userDetails&&<div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
}
      </div>
       
    </div>
  );
}
export default View;
