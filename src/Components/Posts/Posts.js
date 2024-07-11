import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, collection, getDocs,arrayUnion,doc,updateDoc,arrayRemove} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Heart from '../../assets/Heart';
import './Post.css';
import { PostContext } from '../../store/PostContext';
import { AuthContext } from '../../store/FirebaseContext';

function Posts() {
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState(false);
  const [saved,setSaved]=useState(false)
  const db = getFirestore();
  const {user}=useContext(AuthContext)
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const allProducts = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id
        }));
        setProducts(allProducts);
      
        const likesState = allProducts.reduce((acc, product) => {
          acc[product.id] = false;
          return acc;
        }, {});
        setLikes(likesState);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [db]);

  const HandleLeft = () => {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const HandleRight = () => {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const productID=doc(db,'users',`${user?.email}`)

  const toggleLike = async (productId, product, e) => {
    e.stopPropagation();
    
    if (user) { 
      
      const isLiked = likes[productId];
      
      
      setLikes((prevLikes) => ({
        ...prevLikes,
        [productId]: !prevLikes[productId]
      }));
      
     
      if (isLiked) {
        await updateDoc(productID, {
          savedProduct: arrayRemove({
            id: productId,
            price: product.price,
            img: product.url,
            category: product.category,
            name: product.name
          })
        });
      } else {
       
        await updateDoc(productID, {
          savedProduct: arrayUnion({
            id: productId,
            price: product.price,
            img: product.url,
            category: product.category,
            name: product.name
          })
        });
      }
    } else {
      alert("Please log in to save products");
    }
  };
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
        </div>
        <MdChevronLeft onClick={HandleLeft} className='ArrowLeft' />
        <div id='slider' className="cards">
          {products.map((product) => (
            <div key={product.id}
              className="card"
              onClick={() => {
                setPostDetails(product);
                navigate('/view');
              }}
            >
              <div className="favorite">
                <p onClick={(e) => toggleLike(product.id,product, e)}>
                  {likes[product.id] ? <FaHeart className='FaHeart' /> : <FaRegHeart className='FaHeart' />}
                </p>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight onClick={HandleRight} className='ArrowRight' />
      </div>

      <div className="recommendations">
        
              <img className='Banners' src="../../../Images/OLX.jpg" alt="" />
           
      </div>
    </div>
  );
}

export default Posts;
