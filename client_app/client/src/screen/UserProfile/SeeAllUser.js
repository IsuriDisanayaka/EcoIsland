import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import PopupPage from "../../components/popupPage/index"
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { Modal, Button } from '@mui/material';
import "./seeAlluser.css"

import jsPDF from 'jspdf';
import 'jspdf-autotable';



const useStyles = makeStyles({
  table: {
    minWidth: 650,

  },
});


const ViewAllCustomer = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [visible, setVisible] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setResults] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [rowToDeleteId, setRowToDeleteId] = useState(null);


  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  const handleClosePopup = () => {
    setSelectedRowData(null);
  };
  const handleReset = () => {
    axios.get('http://localhost:8080/api/v1/user?random=' + Math.random())
      .then((response) => {
        setData(response.data.data);
        setShowSearchResults(false);
        setSearchTerm('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    setRowToDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8080/api/v1/user/${rowToDeleteId}`)
      .then((response) => {
        console.log(response);
        const updatedData = data.filter((row) => row.id !== rowToDeleteId);
        setData(updatedData);
        setShowDeleteConfirmation(false);
      });
  };



  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/user').then((response) => {
      setData(response.data.data);
    });
  }, []);

  const handleSearch = (type, input) => {
    axios
      .get(`http://localhost:8080/api/v1/user/${type}/${input}`)
      .then((response) => {
        setData(response.data.data);
        setShowSearchResults(true);
      })
      .catch((error) => {
        console.log(error);
        setShowSearchResults(false);
      });
  };

  const handleSort = (property) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleClick = (id) => {
    const clickedData = data.find((row) => row.id === id);


  };
  function downloadPDF() {
    const doc = new jsPDF();

    doc.autoTable({
      head: [['ID', 'First Name', 'Last Name', 'Address', 'Contact', 'Email', 'NIC', 'Date of Birth', 'Gender', 'Rolet', 'Created Date', 'Email Verify']],
      body: data.map((row) => [row.id, row.firstName, row.lastName, row.address, row.contact, row.email, row.nic, row.dateOfBirth.substr(0, 10), row.gender, row.role, row.createdDate.substr(0, 10), row.enabled ? 'Verified' : 'Not verified yet']),
    });

    doc.save('UserDetails.pdf');
  }


  return (
    <div style={{}} >


      <div className="card  div " style={{ marginLeft: "106px", marginTop: "-9px" }}>
        <h1 style={{
          marginLeft: ' -37px', fontWeight: 'lighter', fontSize: '53px',
          fontFamily: 'fangsong', color: '#a70d92'
        }}>Customer Information</h1>

        <div className="card flex flex-column md:flex-row gap-3">
          <div style={{ marginTop: "90px", marginLeft: '-35px' }}>
            <input type="text" id="search-input" />
            <select id="search-type">
              <option value="id">Id</option>
              <option value="firstName">Frist Name</option>
              <option value="gender">Gender</option>
              <option value="LastName">Last Name</option>
              <option value="nic">NIC</option>
              <option value="contact">Contact</option>
              <option value="address">Address</option>
            </select>
            <button onClick={() => handleSearch(document.getElementById('search-type').value, document.getElementById('search-input').value)} style={{
              height: '36px', width: '89px', fontFamily: 'inherit', fontWeight: 'bolder', backgroundColor: '#57C'
            }} >Search</button>
            {showSearchResults ? (
              <button onClick={handleReset} style={{
                height: '36px', width: '89px', fontFamily: 'inherit', fontWeight: 'bolder', backgroundColor: 'yellow'
              }} >Reset</button>
            ) : null}
          </div>
        </div>
      </div>
      <div >
        <div style={{
          display: 'flex', flex: 'row', marginBottom: '32px', justifyContent: 'flex-end', 'marginTop': '-77px'
        }}>
          <IconButton
            style={{

              backgroundColor: 'rgba(0,0,0,0.14)',
              borderRadius: '25px',
              marginRight: '44px'
            }}
            className='j'
            onClick={downloadPDF}
          >
            <PictureAsPdfOutlinedIcon style={{ color: 'black' }} />

          </IconButton>
        </div>
        <TableContainer component={Paper} style={{ marginLeft: "73px", marginTop: "-10px" }}>
          <Table style={{ width: '78vw' }}>
            <TableHead  >
              <TableRow style={{ fontWeight: ' bolder', fontSize: '16px' }}>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }}>ID</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }}
                  sortDirection={orderBy === 'firstName' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'firstName'}
                    direction={orderBy === 'firstName' ? order : 'asc'}
                    onClick={handleSort('firstName')}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sortDirection={orderBy === 'lastName' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'lastName'}
                    direction={orderBy === 'lastName' ? order : 'asc'}
                    onClick={handleSort('lastName')} style={{ fontWeight: ' bolder', fontSize: '18px' }}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>

                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }} >Address</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }} >Contact</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }}>Email</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }}>NIC</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }}>Date of Birth</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }}>Gender</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }}>Role</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }}>Created Date</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }} >Email Verify</TableCell>
                <TableCell style={{ fontWeight: ' bolder', fontSize: '16px' }} >Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} onClick={() => handleClick(row.id)}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.fristName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.nic}</TableCell>
                  <TableCell>{row.dateOfBirth.substr(0, 10)}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.createdDate.substr(0, 10)}</TableCell>
                  <td>{row.enabled ? 'Verified' : 'Not verified yet'}</td>
                  <TableCell >
                    <IconButton
                      style={{
                        fontSize: 15,
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "44%",
                        height: "30px",
                      }}
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </IconButton>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedRowData && (
          <PopupPage data={selectedRowData} onClose={handleClosePopup} />
        )}
        <Modal open={showDeleteConfirmation} style={{ background: 'white', width: '25vw', height: '25vh' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h2 style={{ fontWeight: 'bold' }}>Confirm Deletion</h2>
            <p style={{ color: 'red' }}>Are you sure you want to delete this row?</p>
            <Button onClick={confirmDelete} variant="contained" color="primary">
              Yes
            </Button>
            <Button onClick={() => setShowDeleteConfirmation(false)} variant="contained" color="secondary">
              No
            </Button>
          </div>
        </Modal>
      </div>



    </div>

  );
};

export default ViewAllCustomer;