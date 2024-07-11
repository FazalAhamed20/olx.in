import React, { useContext, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Post from './store/PostContext';

const Home = React.lazy(() => import('./Pages/Home'));
const Signup = React.lazy(() => import('./Pages/Signup'));
const Login = React.lazy(() => import('./Pages/Login'));
const Create = React.lazy(() => import('./Pages/Create'));
const View = React.lazy(() => import('./Pages/ViewPost'));
const Saved = React.lazy(() => import('./Pages/Saved'));

function App() {
  const { setUser } = useContext(AuthContext);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    
    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <div>
      <Post>
        <React.Suspense fallback="loading ...">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/view' element={<View />} />
            <Route path='/saved' element={<Saved />} />
          </Routes>
        </React.Suspense>
      </Post>
    </div>
  );
}

export default App;
