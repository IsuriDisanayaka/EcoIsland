import React, { useState } from "react";
import './style.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import admin from '../../assets/img/admin.png';
import LanguageDropdown from "../../components/LanguageDropdown";
import { useTranslation } from 'react-i18next';

const Modal = ({ title, content, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default function AdminProfile() {
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const id = adminData.id;
  const role = adminData.role;
  const [email, setEmail] = useState(adminData.email);
  const [password, setPassword] = useState(adminData.password);
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { t } = useTranslation();

  const handleConfirmPasswordUpdate = () => {
    const adminDto = {
      id: id,
      email: email,
      role: role,
      password: newPassword,
    };

    axios
      .put(`http://localhost:8080/api/v1/admin/${id}`, adminDto)
      .then((response) => {
        console.log('Data updated successfully', response.data);
        localStorage.setItem("adminData", JSON.stringify({ id, email, password: newPassword }));
        setNewPassword('')
        setPassword(newPassword);
        setShowPasswordModal(false);
        setShowNewPasswordField(false);
        toast.success("Password updated successfully");

      })
      .catch((error) => {
        toast.error('Error updating data', error);
      });
  };

  const handleCancelPasswordUpdate = () => {
    setShowPasswordModal(false);
    setShowNewPasswordField(false);
  };


  return (
    <div className="profile-container" style={{ display: 'flex', justifyContent: 'space-between', }}>
      <div >

        <h1 style={{
          fontWeight: 'lighter', fontSize: '53px',
          fontFamily: 'fangsong', color: '#a70d92'
        }}>{t("My Profile")}</h1>
        <div className="profile-box">
          <img src={admin} style={{ width: '142px', paddingLeft: 198 }} />

          <div className="mb-4">
            <label className="label" htmlFor="email">{t("Email")}:</label>
            <input
              id="email"
              type="text"
              className="input-field"
              value={email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="label" htmlFor="password">{t("Password")}:</label>
            <input
              id="password"
              type="password"
              className="input-field"
              value={password}
              readOnly
            />
          </div>

        </div>


      </div >

      <div style={{ position: 'relative', bottom: '655px', left: '875px', }}>

        <h1 style={{
          fontWeight: 'lighter', fontSize: '53px',
          fontFamily: 'fangsong', color: '#a70d92', marginLeft: '-99px', marginTop: '15px',
        }}> {t("Change Password")}</h1>
        <div className="change-box">

          <div className="mb-4">
            <label className="label" htmlFor="password">{t("Password")}:</label>
            <input
              id="password"
              type="password"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="label" htmlFor="newPassword">{t("New Password")}:</label>
            <input
              id="newPassword"
              type="password"
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-center mt-4">
            <button
              className="updateButton"
              onClick={() => {
                setShowPasswordModal(true);
                setShowNewPasswordField(true);
              }}
            >
              {t("Update")}
            </button>
          </div>
        </div>

        {showPasswordModal && (
          <Modal
            title="Update Password"
            content="Do you want to update your password?"
            onConfirm={handleConfirmPasswordUpdate}
            onCancel={handleCancelPasswordUpdate}
          />
        )}
      </div>
    </div>


  );
}
