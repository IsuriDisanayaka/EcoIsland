import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function UserProfile() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const fristName = userData.fristName;
  const lastName = userData.lastName;
  const address = userData.address;
  const nic = userData.nic;
  const contact = userData.contact;
  const email = userData.email;
  const dateOfBirth = userData.dateOfBirth;
  const [posts, setPosts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({ ...userData });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);



  const handleUpdateUser = () => {
    setIsEditMode(true);
    setIsUpdateModalOpen(true);

  };
  function UpdateConfirmationModal({ onCancel, onConfirm }) {
    return (
      <div className="update-modal">
        <p>Have you just finished updating the details?</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  }
  const handleCancelUpdate = () => {
    setIsUpdateModalOpen(false);
    setIsEditMode(false);
    setUpdatedUserData({ ...userData });
  };
  const handleConfirmUpdate = () => {
    const dataToSend = { ...updatedUserData };

    axios.put(`http://localhost:8080/api/v1/user/${userData.id}`, dataToSend)
      .then((response) => {
        if (response.status === 200) {
          setIsEditMode(false);

          localStorage.setItem('userData', JSON.stringify(dataToSend));
          toast.success('Update successful');
          setIsUpdateModalOpen(false);
        } else {
          console.error('Update failed');
          toast.error('Update failed');
          setIsUpdateModalOpen(false);
        }
      })
      .catch((error) => {
        console.error('Error while updating:', error);
        toast.error('Error while updating');
      });
  };




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
  };
  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8080/api/v1/user/${userData.id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Delete successful');
          localStorage.removeItem('userData');
          localStorage.setItem('loggedIn', false);
          window.location.href = '/';
        } else {
          console.error('Delete failed');
          toast.error('Delete failed');
        }
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error('Error while deleting:', error);
        setIsDeleteModalOpen(false);
        toast.error('Error while deleting');
      });
  };
  const handleDeleteUser = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="user-profile-container">
      <h1 className="user-profile-title" style={{
        fontWeight: 'lighter', fontSize: '53px',
        fontFamily: 'fangsong', color: 'rgb(13 37 167)'
      }}>My Profile</h1>
      <div className="user-profile-card">
        <div className="user-profile-field">
          <label className="user-profile-label" htmlFor="firstName">
            First Name:
          </label>
          <input
            id="fristName"
            type="text"
            name="fristName"
            className="user-profile-input"
            value={isEditMode ? updatedUserData.fristName : userData.fristName}
            readOnly={!isEditMode}
            onChange={handleInputChange}
          />

        </div>
        <div className="user-profile-field">
          <label className="user-profile-label" htmlFor="lastName">
            Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            className="user-profile-input"
            name="lastName"
            value={isEditMode ? updatedUserData.lastName : userData.lastName}
            readOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </div>
        <div className="user-profile-field">
          <label className="user-profile-label" htmlFor="address">
            Address:
          </label>
          <input
            id="address"
            type="text"
            name="address"
            className="user-profile-input"
            value={isEditMode ? updatedUserData.addresss : userData.address}
            readOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </div>
        <div className="user-profile-field">
          <label className="user-profile-label" htmlFor="nic">
            NIC Number:
          </label>
          <input
            id="nic"
            type="text"
            name="nic"
            className="user-profile-input"
            value={isEditMode ? updatedUserData.nic : userData.nic}
            readOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </div>
        <div className="user-profile-field">
          <label className="user-profile-label" htmlFor="contact">
            Contact:
          </label>
          <input
            id="contact"
            type="text"
            name="contact"
            className="user-profile-input"
            value={isEditMode ? updatedUserData.contact : userData.contact}
            readOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </div>
        <div className="user-profile-field">
          <label className="user-profile-label" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="text"
            name="email"
            className="user-profile-input"
            value={isEditMode ? updatedUserData.email : userData.email}
            readOnly
            onChange={handleInputChange}
          />
        </div>
        <div className="user-profile-field">
          <label className="user-profile-label" htmlFor="dateOfBirth">
            Date Of Birth:
          </label>
          <input
            id="dateOfBirth"
            type="text"
            name="dateOfBirth"
            className="user-profile-input"
            value={isEditMode ? updatedUserData.dateOfBirth : userData.dateOfBirth}
            readOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </div>

      </div>
      <div className="user-profile-buttons">
        <div className="user-profile-buttons">

          <>

          </>

          <button className="user-profile-Updatebutton" onClick={handleUpdateUser}>
            Update
          </button>

        </div>
        <button className="user-profile-deletebutton"
          onClick={handleDeleteUser}>
          Delete
        </button>
      </div>
      {isUpdateModalOpen && (
        <UpdateConfirmationModal
          onCancel={handleCancelUpdate}
          onConfirm={handleConfirmUpdate}
        />
      )}
      {isDeleteModalOpen && (
        <div className="delete-modal">
          <p>Are you sure you want to delete your account?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}
