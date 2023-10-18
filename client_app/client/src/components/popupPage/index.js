import React from 'react'
import './pop.css'
const PopupPage = ({ data, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Selected Row Data</h2>
        <table>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td>{key}:</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupPage