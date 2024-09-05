import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Reservations from './components/Reservations';
// import EditReservationForm from './EditReservationForm';
import ReservationForm from './components/ReservationForm';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [reservations, setReservations] = useState([
    //Default Data
    { id: 1, guestName: "Laynne Neal", licensePlate: "XYZ 1234", mobile: "123-456-7890", startDateTime: "2024-06-03T16:26", endDateTime: "2024-06-04T12:00", location: "Room 306", rate: 100, status: "Delivered", tickets: 2, room: 306, billing: "Paid" },
    { id: 2, guestName: "Deborah Hatch", licensePlate: "XYZ 5678", mobile: "123-456-7891", startDateTime: "2024-06-03T16:26", endDateTime: "2024-06-04T12:00", location: "Room 3062", rate: 150, status: "Delivered", tickets: 2, room: 3062, billing: "N/A" },
    { id: 3, guestName: "Shawn Morris", licensePlate: "XYZ 5678", mobile: "123-456-7891", startDateTime: "2024-06-03T16:26", endDateTime: "2024-06-04T12:00", location: "Room 3062", rate: 150, status: "Delivered", tickets: 2, room: 3062, billing: "pending" },
    { id: 4, guestName: "camron", licensePlate: "XYZ 5678", mobile: "123-456-7891", startDateTime: "2024-06-03T16:26", endDateTime: "2024-06-04T12:00", location: "Room 3062", rate: 150, status: "Delivered", tickets: 2, room: 3062, billing: "paid" },
    { id: 5, guestName: "Dennis", licensePlate: "XYZ 5678", mobile: "123-456-7891", startDateTime: "2024-06-03T16:26", endDateTime: "2024-06-04T12:00", location: "Room 3062", rate: 150, status: "Delivered", tickets: 2, room: 3062, billing: "N/A" },
  ]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
    setCurrentView('form');
  };

  const handleSave = (newReservation) => {
    if (selectedReservation) {
      // Edit existing reservation
      setReservations(reservations.map(res =>
        res.id === newReservation.id ? newReservation : res
      ));
    } else {
      // Add new reservation
      setReservations([...reservations, { ...newReservation, id: reservations.length + 1 }]);
    }
    setSelectedReservation(null);
    setCurrentView('list');
  };

  const handleCancel = () => {
    setSelectedReservation(null);
    setCurrentView('list');
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="app">
      <Sidebar onSelect={handleViewChange} />
      <div className="main-content">
        {currentView === 'reservation' && <Reservations reservations={reservations} onEdit={handleEdit} />}
        {currentView === 'form' && <ReservationForm onSave={handleSave} onCancel={handleCancel} reservation={selectedReservation} />}
        {/* Add conditions for other views (e.g., 'dashboard', 'location', 'users') */}
      </div>
    </div>
  );
}

export default App;
