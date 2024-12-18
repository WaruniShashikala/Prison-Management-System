import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import "./medicine.css";
import "./medicinePrint.css"
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:3500/medicine";

function Medicine() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State for showing the alert
  const [printableRecord, setPrintableRecord] = useState(null); // State to hold the printable record
  const componentRef = useRef(); // Reference to the MedicinePrint component

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        if (response.data && response.data.medicine) {
          setUsers(response.data.medicine);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (medicineId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
    if (!confirmDelete) {
      return; // If user cancels, exit the function
    }

    try {
      await axios.delete(`${URL}/${medicineId}`);
      const response = await axios.get(URL);
      if (response.data && response.data.medicine) {
        setUsers(response.data.medicine);
        setShowAlert(true); // Show the alert

        setTimeout(() => {
          setShowAlert(false); // Hide the alert after 3 seconds (adjust as needed)
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.expire.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.note.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "User Report",
    onAfterPrint: () => {
      setPrintableRecord(null); // Reset the printable record after printing
      alert("User report successfully downloaded!");
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  const handlePrintRecord = (record) => {
    setPrintableRecord(record);
    handlePrint(); // Call handlePrint to print the record
  };

  return (
    <div>
      <Sidebar />
      <center>
        {/* Alert box */}
        {showAlert && (
          <div className="alert-box">
            Medicine deleted successfully!
          </div>
        )}

        <h1>Medical resources </h1>

        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            marginTop: "20px",
            borderRadius: "4px",
            width: "200px",
          }}
          value={searchQuery}
          onChange={handleSearch}
        />

        <table className="tablemed">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>MG</th>
              <th>Quantity</th>
              <th>Expire Date</th>
              <th>Supplier</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((medicine) => (
              <tr key={medicine._id}>
                <td>{medicine.name}</td>
                <td>{medicine.type}</td>
                <td>{medicine.mg}</td>
                <td>{medicine.quantity}</td>
                <td>{formatDate(medicine.expire)}</td>
                <td>{medicine.supplier}</td>
                <td>{medicine.note}</td>
                <td>
                  <button
                    className="btnupdate"
                    onClick={() => handlePrintRecord(medicine)}
                  >
                    Print
                  </button>
                  <Link to={`/medicinepage/${medicine._id}`}>
                    <button className="btnupdate">Update</button>
                  </Link>
                  <button
                    className="btndelete"
                    onClick={() => deleteHandler(medicine._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <Link to="/medicineform">
          <button className="btnadd" id="addBtn">
            Add
          </button>
        </Link>
      </center>

      {/* Printable record */}
      {printableRecord && (

      <div style={{ display: "none" }}>

        <div className="printable-record" ref={componentRef}>
          <h1 className="medtitle">Medicine Records</h1>
          <div className="meddetailset">
          <p className="meddetails">Name :{printableRecord.name}</p>
          <p className="meddetails">Type: {printableRecord.type}</p>
          <p className="meddetails">MG: {printableRecord.mg}</p>
          <p className="meddetails">Quantity: {printableRecord.quantity}</p>
          <p className="meddetails">Expire Date: {formatDate(printableRecord.expire)}</p>
          <p className="meddetails">Supplier: {printableRecord.supplier}</p>
          <p className="meddetails">Note: {printableRecord.note}</p>

          </div>

          <div className="footer-container">
    <p className="footer-date">Date: ........./........./.............</p>
    <p className="footer-check">Checked By: ..................................</p>
    <p className="footer-signature">Signature: ..............................</p>
  </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Medicine;
