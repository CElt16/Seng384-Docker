import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import PeopleList from './components/PeopleList';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">Person Management</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Register</Link>
            <Link to="/people" className="nav-link">People List</Link>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/people" element={<PeopleList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
