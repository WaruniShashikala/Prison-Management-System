import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Sidebar from '../Sidebar';
import './medicineForm.css';

function MedicineUpdate() {
  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/medicine/${id}`);
        setInputs(response.data.medicine);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHandler();
  }, [id]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setInputs((prevState) => ({
      ...prevState,
      expire: today,
    }));
  }, []);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3500/medicine/${id}`, {
        name: String(inputs.name),
        type: String(inputs.type),
        mg: String(inputs.mg),
        quantity: String(inputs.quantity),
        expire: inputs.expire,
        supplier: String(inputs.supplier),
        note: String(inputs.note),
      })
      .then((res) => res.data);
  };

  const handleChanger = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z]+$/.test(inputs.name)) {
      setErrorMessage('Name should contain only letters.');
      return;
    }
    if (isNaN(inputs.quantity)) {
      setErrorMessage('You cannot enter text for quantity.');
      return;
    }
    sendRequest().then(() => history('/mainmedical'));
  };

  const handleKeyDown = (e) => {
    const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Sidebar />
      <center>
        <h1>Medicine update</h1>
        <form className="form-container" onSubmit={handleSubmit}>

        {errorMessage && <div className="form-error">{errorMessage}</div>}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              name="name"
              onKeyDown={handleKeyDown}
              onChange={handleChanger}
              value={inputs.name}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="type">
              Type
            </label>
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
            <label className="form-label" htmlFor="mg">
              MG
            </label>
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
            <label className="form-label" htmlFor="quantity">
              Quantity
            </label>
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
            <label className="form-label" htmlFor="expire">
              Expire
            </label>
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
            <label className="form-label" htmlFor="supplier">
              Supplier
            </label>
            <input
              className="form-input"
              type="text"
              name="supplier"
              onChange={handleChanger}
              value={inputs.supplier}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="note">
              Note
            </label>
            <input
              className="form-input"
              type="text"
              name="note"
              onChange={handleChanger}
              value={inputs.note}
              required
            />
          </div>
          <button className="form-button" type="submit">Update</button>
        </form>
      </center>
    </div>
  );
}

export default MedicineUpdate;
