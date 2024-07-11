import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { getStorage, ref, uploadBytes ,getDownloadURL } from "firebase/storage";
import {addDoc,collection,getFirestore} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'


const Create = () => {
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error,setError]=useState('')
  const storage = getStorage();
 const storageRef = ref(storage, `/images/${image ? image.name : ''}`);
  const db=getFirestore()
  const date=new Date()
  const navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name || !category || !price || !image) {
      setError('Please fill the required fills')
      return;
    }
  
    await uploadBytes(storageRef, image)
      .then(({ metadata }) => {
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, "products"), {
            userId: user.uid,
            name,
            category,
            price,
            url,
            createdAt: date.toDateString()
          })
          navigate('/')
        })
      })
      .catch((error) => {
        alert(error.message)
      });
  };
  
  

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
      {error ? <p className='Error'>{error}</p> : null}
        <form>
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            type="text"
            id="name"
            name="name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            value={category}
            onChange={(e) => { setCategory(e.target.value) }}
            type="text"
            id="category"
            name="category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            value={price}
            onChange={(e) => { setPrice(e.target.value) }}
            type="number"
            id="price"
            name="price"
            min={1}
          />
          <br />
        </form>
        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
        <form>
          <br />
          <input
            onChange={(e) => { setImage(e.target.files[0]) }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
