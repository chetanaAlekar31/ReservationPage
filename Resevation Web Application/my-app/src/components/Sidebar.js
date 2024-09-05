
import React from 'react';
import './Sidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <h4><b>ParkSync</b> Admin Panel</h4>
      <nav>
        <ul>
          <li onClick={() => onSelect('dashboard')}>
            <i className="fas fa-tachometer-alt"></i>
            <span> Dashboard</span>
          </li>
          <li onClick={() => onSelect('location')}>
            <i className="fas fa-map-marker-alt"></i>
            <span> Location</span>
          </li>
          <li onClick={() => onSelect('reservation')}>
            <i className="fas fa-calendar-alt"></i>
            <span> Reservation</span>
          </li>
          <li onClick={() => onSelect('users')}>
            <i className="fas fa-users"></i>
            <span> Users</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
