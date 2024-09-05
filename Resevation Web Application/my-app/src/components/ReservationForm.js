import React, { useState, useEffect } from 'react';
import './ReservationForm.css';
import CarMakeModal from './CarMakeModal';


const ReservationForm = ({ onSave, onCancel, reservation }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    licensePlate: '',
    mobile: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    rate: '',
    carMake: '',
    carType: '',
    carColor: ''
  });
  
  const [isCarMakeModalOpen, setCarMakeModalOpen] = useState(false);

  useEffect(() => {
    if (reservation) {
      setFormData({
        guestName: reservation.guestName || '',
        licensePlate: reservation.licensePlate || '',
        mobile: reservation.mobile || '',
        startDateTime: reservation.startDateTime || '',
        endDateTime: reservation.endDateTime || '',
        location: reservation.location || '',
        rate: reservation.rate || '',
        carMake: reservation.carMake || '',
        carType: reservation.carType || '',
        carColor: reservation.carColor || ''
      });
    } else {
      setFormData({
        guestName: '',
        licensePlate: '',
        mobile: '',
        startDateTime: '',
        endDateTime: '',
        location: '',
        rate: '',
        carMake: '',
        carType: '',
        carColor: ''
      });
    }
  }, [reservation]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (reservation) {
      onSave({
        ...formData,
        id: reservation.id
      });
    } else {
      onSave({
        ...formData,
        id: Date.now()
      });
    }
  };

  const openCarMakeModal = () => setCarMakeModalOpen(true);
  const closeCarMakeModal = () => setCarMakeModalOpen(false);
  const handleCarMakeSelect = (make) => {
    setFormData(prevState => ({ ...prevState, carMake: make }));
    closeCarMakeModal();
  };

  return (
    <div className="reservation-form-container">
      <h2>{reservation ? 'Edit Reservation' : 'Add Reservation'}</h2>
      <form onSubmit={handleSubmit}>
        {reservation ? (
          <>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
            </div>
            <div className="date-time-group">
              <div className="form-group">
                <label htmlFor="startDateTime">Start Date & Time:</label>
                <input
                  id="startDateTime"
                  name="startDateTime"
                  type="datetime-local"
                  value={formData.startDateTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDateTime">End Date & Time:</label>
                <input
                  id="endDateTime"
                  name="endDateTime"
                  type="datetime-local"
                  value={formData.endDateTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="inline-form-group">
              <div className="form-group">
                <label htmlFor="guestName">Guest Name:</label>
                <input
                  id="guestName"
                  name="guestName"
                  type="text"
                  value={formData.guestName}
                  onChange={handleChange}
                  placeholder="Guest Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="licensePlate">License Plate:</label>
                <input
                  id="licensePlate"
                  name="licensePlate"
                  type="text"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  placeholder="License Plate"
                  required
                />
              </div>
            </div>
            <div className="date-time-group">
              <div className="form-group">
                <label htmlFor="startDateTime">Start Date & Time:</label>
                <input
                  id="startDateTime"
                  name="startDateTime"
                  type="datetime-local"
                  value={formData.startDateTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDateTime">End Date & Time:</label>
                <input
                  id="endDateTime"
                  name="endDateTime"
                  type="datetime-local"
                  value={formData.endDateTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="location-rate-group">
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rate">Rate:</label>
                <input
                  id="rate"
                  name="rate"
                  type="number"
                  value={formData.rate}
                  onChange={handleChange}
                  placeholder="Rate"
                  required
                />
              </div>
            </div>
          </>
        )}
        <h3>Car Details</h3>
        <div className="car-details-section">
          <div className="car-details-buttons">
            <button
              type="button"
              className="car-details-button"
              onClick={openCarMakeModal}
            >
              <span className="car-icon">🚗</span>
              Car Make
            </button>
            <button
              type="button"
              className="car-details-button"
              onClick={() => alert('Car Type clicked')}
            >
              <span className="car-icon">🚙</span>
              Car Type
            </button>
            <button
              type="button"
              className="car-details-button"
              onClick={() => alert('Car Color clicked')}
            >
              <span className="car-icon">🎨</span>
              Car Color
            </button>
          </div>
        </div>
        <div className="settings-section">
          <h4>Settings</h4>
          <div className="settings-content">
            <div className="settings-box">
              <div className="settings-info">
                <h5>In and Out Privileges</h5>
                <h5>About In and Out Privileges</h5>
              </div>
              <div className="settings-checkbox">
                <input type="checkbox" id="inOutPrivileges" />
                <label htmlFor="inOutPrivileges">
                  <h5>Allow In and Out Privileges?</h5>
                  <h6>Can a guest park multiple times during this reservation?</h6>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
      <CarMakeModal 
        isOpen={isCarMakeModalOpen} 
        onClose={closeCarMakeModal} 
        onSelect={handleCarMakeSelect} 
      />
    </div>
  );
};

export default ReservationForm;
