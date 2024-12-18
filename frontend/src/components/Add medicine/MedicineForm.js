import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

function MedicineForm() {
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    type: "",
    mg: "",
    quantity: "",
    expire: "",
    supplier: "",
    note: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setInputs((prevState) => ({
      ...prevState,
      expire: today,
    }));
  }, []);

  const handleChanger = (e) => {
    const { name, value } = e.target;

    // Update regular expression to allow only letters and spaces
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrorMessage("Name should contain only letters.");
    } else {
      setErrorMessage(""); 
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to restrict symbols and numbers
  const handleKeyDown = (e) => {
    const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]*$/.test(inputs.name)) {
      setErrorMessage("Name should contain only letters.");
      return;
    }
    if (isNaN(inputs.quantity)) {
      setErrorMessage("You cannot enter text for quantity.");
      return;
    }
    await sendRequest();
    history("/mainmedical");
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:3500/medicine", {
        name: String(inputs.name),
        type: String(inputs.type),
        mg: String(inputs.mg),
        quantity: parseInt(inputs.quantity),
        expire: inputs.expire, 
        supplier: String(inputs.supplier),
        note: String(inputs.note),
      })
      .then((res) => res.data);
  };

  return (
    <div style={{ position: "relative" }}>
      <Sidebar/>
      
      <center><h1>Medicine form</h1></center>
      <form className="form-container" onSubmit={handleSubmit}>

      {errorMessage && (
          <div className="form-error">{errorMessage}</div>
        )}
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            onChange={handleChanger}
            onKeyDown={handleKeyDown}
            value={inputs.name}
            required
          />

          
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="type">Type</label>
          <select
            className="form-input"
            name="type"
            onChange={handleChanger}
            value={inputs.type}
            required
          >
            <option value="">Select Type</option>
            <option value="Antibiotics">Antibiotics</option>
            <option value="Antidiabetic Drugs">Antidiabetic Drugs</option>
            <option value="Statins">Statins</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="mg">MG</label>
          <input
            className="form-input"
            type="text"
            name="mg"
            onChange={handleChanger}
            value={inputs.mg}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="quantity">Quantity</label>
          <input
            className="form-input"
            type="text"
            name="quantity"
            onChange={handleChanger}
            value={inputs.quantity}
            required
          />
        </div>

       

        <div className="form-group">
          <label className="form-label" htmlFor="expire">Expire</label>
          <input
            className="form-input"
            type="date"
            name="expire"
            onChange={handleChanger}
            value={inputs.expire}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="supplier">Supplier</label>
          <input
            className="form-input"
            type="text"
            name="supplier"
            onChange={handleChanger}
            onKeyDown={handleKeyDown}
            value={inputs.supplier}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="note">Note</label>
          <input
            className="form-input"
            type="text"
            name="note"
            onChange={handleChanger}
            onKeyDown={handleKeyDown}
            value={inputs.note}
            required
          />
        </div>

        <button className="form-button" type="submit">Submit</button>
      </form>

      
      <style>
        {`
          .form-error {
            color: #f44336;
            font-size: 14px;
            margin-top: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default MedicineForm;
