import React, { useEffect } from 'react';
import { useDispatch,  } from 'react-redux';
import { fetchData } from './store/dataSlice';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Details from './pages/details';
import './app.scss'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Router>    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;