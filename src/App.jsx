import { db, auth } from './firebase';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';


function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    })
  }, []);

  return (
    <Router>
      <header>
        <Navbar firebaseUser={firebaseUser} auth={auth} />
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login auth={auth} db={db} />} />
        <Route path='admin' element={<Admin db={db} />} />
      </Routes>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-4 mt-5 bg-warning bg-opacity-50">
        <p className="col-12 col-md-4 mb-3 mb-md-0 text-center text-body-secondary">© 2024 BookLand</p>

        <a to="/"
          className="col-12 col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-body-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-book-half"
            viewBox="0 0 16 16">
            <path
              d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
          </svg>
        </a>

        <ul className="nav col-12 col-md-4 justify-content-center">
          <li className="nav-item"><a to="/Home" className="nav-link px-2 text-body-secondary">Home</a></li>
          <li className="nav-item"><a to="/about-us" className="nav-link px-2 text-body-secondary">About Us</a>
          </li>
          <li className="nav-item"><a to="/borrow" className="nav-link px-2 text-body-secondary">Borrow a Book</a></li>
          <li className="nav-item"><a to="/message" className="nav-link px-2 text-body-secondary">Suggestions</a></li>
        </ul>
      </footer>
    </Router>
  )
}

export default App;
