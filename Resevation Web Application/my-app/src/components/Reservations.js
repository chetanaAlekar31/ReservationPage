import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import './Reservations.css';

const Reservations = ({ reservations, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedReservations, setEditedReservations] = useState(reservations);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoomNumberChange = (id, newRoomNumber) => {
    const updatedReservations = editedReservations.map(res =>
      res.id === id ? { ...res, room: newRoomNumber } : res
    );
    setEditedReservations(updatedReservations);
  };

  const handleEditMode = (id) => {
    setEditMode(id);
  };

  const handleBlur = () => {
    setEditMode(null);
  };

  const filteredReservations = editedReservations.filter(res =>
    (res.guestName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadReport = () => {
    const header = "Details,Start,End,Status,Tickets,Room Number,Ext. Billing\n";
    const rows = filteredReservations.map(res =>
      `${res.guestName || ''},${formatDateTime(res.startDateTime) || ''},${formatDateTime(res.endDateTime) || ''},${res.status || ''},${res.tickets || ''},${res.room || ''},${res.billing || ''}`
    ).join('\n');
    const csvContent = "data:text/csv;charset=utf-8," + header + rows;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const getBillingClassName = (billing) => {
    switch ((billing || '').toLowerCase()) {
      case 'paid':
        return 'billing-paid';
      case 'pending':
        return 'billing-pending';
      case 'na':
      default:
        return 'billing-na';
    }
  };

  return (
    <div className="reservation-container">
      <div className="header-section">
        <h2>Reservations</h2>
        <LoginIcon className="login-icon" />
      </div>
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchIcon className="search-icon" />
        </div>
        <div className="action-buttons">
          <button className="action-button add-button" onClick={() => onEdit(null)}>Add Reservation</button>
          <button className="action-button download-button" onClick={downloadReport}>
            Download Report
          </button>
        </div>
      </div>
      <div className="reservation-list">
        <table>
          <thead>
            <tr>
              <th>Details</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Tickets</th>
              <th>Room Number</th>
              <th>Ext. Billing</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((res) => (
              <tr key={res.id}>
                <td>{res.guestName || ''}</td>
                <td>{formatDateTime(res.startDateTime) || ''}</td>
                <td>{formatDateTime(res.endDateTime) || ''}</td>
                <td>{res.status || ''}</td>
                <td>{res.tickets || ''}</td>
                <td>
                  {editMode === res.id ? (
                    <input
                      type="text"
                      value={res.room || ''}
                      onChange={(e) => handleRoomNumberChange(res.id, e.target.value)}
                      onBlur={handleBlur}
                      className="editable-room-number"
                    />
                  ) : (
                    <span onClick={() => handleEditMode(res.id)}>{res.room || ''}</span>
                  )}
                </td>
                <td className={getBillingClassName(res.billing)}>
                  <span className="status-box">{res.billing || 'NA'}</span>
                </td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(res)}>
                    <EditIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
