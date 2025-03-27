import React, { useEffect } from 'react';
import { useDispatch,  } from 'react-redux';
import { fetchData } from './store/dataSlice';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import './App.css'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;