import { db, auth } from './firebase';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reservation from './components/Reservation';


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
        <Route path='reservation' element={<Reservation db={db} firebaseUser={firebaseUser} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
