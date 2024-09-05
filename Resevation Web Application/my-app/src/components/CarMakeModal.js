import React, { useState } from 'react';
import './CarMakeModal.css'; // Ensure you have styles for your modal

const CarMakeModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const carMakes = ['BMW', 'Creta', 'Audi', 'Acura', 'Ertiga']; // Example car makes

  const filteredCarMakes = carMakes.filter(make =>
    make && make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (make) => {
    setSelectedMake(make);
    onSelect(make);
    onClose(); // Close modal after selection
  };

  return (
    isOpen ? (
      <div className="car-make-modal-overlay">
        <div className="car-make-modal-content">
          <h3>Select Car Make</h3>
          <input 
            type="text" 
            placeholder="Search car make..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <form>
            {filteredCarMakes.map((make, index) => (
              <label key={index} className="custom-radio">
                <input
                  type="radio"
                  name="carMake"
                  value={make}
                  checked={selectedMake === make}
                  onChange={() => handleSelect(make)}
                />
                <span className="radio-btn"></span>
                {make}
              </label>
            ))}
          </form>
          <div className="modal-actions">
            <button onClick={onClose}>Cancel</button>
            <button onClick={() => onSelect(selectedMake)}>OK</button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default CarMakeModal;
