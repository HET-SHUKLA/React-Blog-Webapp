import './App.css'
import auth from './appwrite/auth';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import {Header, Footer} from './components/index'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div>
      <Header />
        <div className="text-5xl">Hello</div>
      <Footer />
    </div>
  ) : null;

}

export default App
