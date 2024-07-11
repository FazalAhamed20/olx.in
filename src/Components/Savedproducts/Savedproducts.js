import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, onSnapshot, doc,updateDoc } from 'firebase/firestore';
import './Savedproduct.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AuthContext } from '../../store/FirebaseContext';
import {AiOutlineClose} from 'react-icons/ai'

function Savedproducts() {
  const db = getFirestore();
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setProducts(doc.data()?.savedProduct || []);
    });

    return () => unsubscribe();
  }, [db, user?.email]);

 
  const handleClick = (productId) => {
    
    console.log(`Clicked product ${productId}`);
  };
  const productRef=doc(db,'users',`${user?.email}`)
  const Delete = async (e, passedID) => {
    e.stopPropagation();
    try {
 
      const updatedProducts = products.filter((product) => product.id !== passedID);
     
      await updateDoc(productRef, {
        savedProduct: updatedProducts,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Favourites</span>
        </div>
        
        <div id="slider" className="cards">
        
          {products.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => handleClick(product.id)}
            >
              <div className="favorite"></div>
              <p onClick={(e)=>{Delete(e,product.id)}} className='Delete'><AiOutlineClose/></p>
              <div className="image">
                <img src={product.img} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
               
              </div>
            </div>
          ))}
        </div>
 
      </div>
    </div>
  );
}

export default Savedproducts;
