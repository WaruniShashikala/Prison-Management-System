import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../Sidebar';

function ProtectiveForm() {

    const history=useNavigate();

    const [inputs,setInputs]=useState({

        name:"",
        model:"",
        Date:"",
        manufacture:"",
        condition:"",
        quantity:"",
        size:"",
        note:""
    });

    const handleChanger=(e)=>{

        setInputs((prevState)=>({

            ...prevState,[e.target.name]:e.target.value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await sendRequest();
          history('/protectivepage'); // Redirect after successful form submission
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
      

    const sendRequest=async()=>{
        await axios.post("http://Localhost:3500/protective",{
            name:String(inputs.name),
            model:String(inputs.model),
            Date:inputs.Date,
            manufacture:String(inputs.manufacture),
            condition:String(inputs.condition),
            quantity:parseInt(inputs.quantity),
            size:parseInt(inputs.size),
            note:String(inputs.note)
            
        }).then(res=>res.data);
    }

  return (
    <div>
      <Sidebar />
      <center>
        <h1>Protective Form</h1>

        <div className='form-container'>

        <form onSubmit={handleSubmit} className="SecurityForm-form">
          <label for="name" className="SecurityForm-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChanger}
            value={inputs.name}
            required
            className="SecurityForm-inputs"
          />

          <label for="model" className="SecurityForm-label">
            Model:
          </label>
          <input
            type="text"
            name="model"
            onChange={handleChanger}
            value={inputs.model}
            required
            className="SecurityForm-inputs"
          />

          <label for="date" className="SecurityForm-label">
            Date:
          </label>
          <input
            type="date"
            name="Date"
            onChange={handleChanger}
            value={inputs.date}
            required
            className="SecurityForm-inputs"
          />

          <label for="manufacturer" className="SecurityForm-label">
            Manufacturer:
          </label>
          <input
            type="text"
            name="manufacture"
            onChange={handleChanger}
            value={inputs.manufacture}
            className="SecurityForm-inputs"
          />

          <label for="condition" className="SecurityForm-label">
            Condition:
          </label>
          <input
            type="text"
            name="condition"
            onChange={handleChanger}
            value={inputs.condition}
            required
            className="SecurityForm-inputs"
          />

          <label for="quantity" className="SecurityForm-label">
            Quantity:
          </label>
          <input
            type="text"
            name="quantity"
            onChange={handleChanger}
            value={inputs.quantity}
            required
            className="SecurityForm-inputs"
          />

          <label for="size" className="SecurityForm-label">
            Size:
          </label>
          <input
            type="text"
            name="size"
            onChange={handleChanger}
            value={inputs.size}
            required
            className="SecurityForm-inputs"
          />

          <label for="note" className="SecurityForm-label">
            Note:
          </label>
          <input
            type="text"
            name="note"
            onChange={handleChanger}
            value={inputs.note}
            required
            className="SecurityForm-inputs"
          />

          <button className="SecurityForm-btn">Submit</button>
        </form>

        </div>
      </center>
    </div>
  );
}

export default ProtectiveForm