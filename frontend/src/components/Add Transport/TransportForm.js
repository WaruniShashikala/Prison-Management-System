import React, { useState,useEffect } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './transportForm.css'


function TransportForm() {
  const history = useNavigate();
  const[errorMessage, setErrorMessage]=useState()

  const [inputs, setInputs] = useState({
    no: "",
    type: "",
    Date: "",
    condition: "",
    milage: "",
    seat: "",
    note: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setInputs((prevState) => ({
      ...prevState,
      Date: today,
    }));
  }, []);

  const handleKeyDown = (e) => {
    const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChanger = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isNaN(inputs.seat)){

      setErrorMessage("you can not enter text for quantity.");
      return;
    }
    //console.log(inputs);
    sendRequest().then(() => history("/maintransport"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://Localhost:3500/transport", {
        no: String(inputs.no),
        type: String(inputs.type),
        Date: inputs.Date,   
        condition: String(inputs.condition),
        milage: String(inputs.milage),
        seat: parseInt(inputs.seat),
        note: String(inputs.note),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Sidebar />
      <center>
        <h1>TransportForm</h1>

        <div className="transportform">

        <form onSubmit={handleSubmit} class="form-container">
          <label for="no">No:</label>
          <input
            type="text"
            name="no"
            onChange={handleChanger}
            onKeyDown={handleKeyDown}
            value={inputs.no}  class="form-input"
            required
          />

<label for="type">Type</label>
          <select name="type" onChange={handleChanger} value={inputs.type}  class="form-select" required>
        <option value="">Select Type</option>
        <option value="prison bus">Prison bus</option>
        <option value="pvehicel">Police vehicel</option>
        <option value="van">Van</option>
       
    </select> 

          <label for="date">Date:</label>
          <input
            type="date"
            name="Date"
            onChange={handleChanger}
            value={inputs.Date} class="form-input"
            required
          />

<label for="condition">Condition:</label>

        <select name="condition" onChange={handleChanger} value={inputs.condition} class="form-select" required>
        <option value="">Select Condition</option>
        <option value="Good">Good</option>
        <option value="Fair">Fair</option>
        <option value="Poor">Poor</option>
       
    </select>

          <label for="milage">Mileage:</label>
          <input
            type="text"
            name="milage"
            onChange={handleChanger}
            value={inputs.milage} class="form-input"
            required
          />

          <label for="seat">Seat:</label>
          <input
            type="text"
            name="seat"
            onChange={handleChanger}
            value={inputs.seat} class="form-input"
            required
          />
           {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

          <label for="note">Note:</label>
          <input
            type="text"
            name="note"
            onChange={handleChanger}
            value={inputs.note} class="form-input"
            required
          />

          <button type="submit" class="transportsubmit">Submit</button>
        </form>

        </div>
      </center>
    </div>
  );
}

export default TransportForm;
