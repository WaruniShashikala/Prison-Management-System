import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import {useNavigate} from 'react-router'
import Sidebar from '../Sidebar';
import './FirearmUpdate.css'


function Firearmpdate() {

    const [inputs,setInputs] =useState({});
    const history =useNavigate();
    const id= useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/firearm/${id}`);
                setInputs(response.data.firearm); // Assuming response.data.firearm contains the firearm data
            } catch (error) {
                console.error(error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest=async()=>{

        await axios.put(`http://Localhost:3500/firearm/${id}`,{

        name:String(inputs.name),
        model:String(inputs.model),
        Date:inputs.Date,    
        manufacture:String(inputs.manufacture),
        condition:String(inputs.condition),
        note:String(inputs.note)

        })

        .then((res)=>res.data);
    };


    const handleChanger=(e)=>{

        setInputs((prevState)=>({

            ...prevState,[e.target.name]:e.target.value,
        }))
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>history('/firearmpage'))
    }

  return (
    <div>

        <Sidebar/>
    <center>
        <h1> Update Firearm </h1>

        <div class="form-container">
  <form onSubmit={handleSubmit}>
    <label for="name" class="form-label">Name:</label>
    <input type="text" name="name" class="form-input" onChange={handleChanger} value={inputs.name} required/>

    <label for="model" class="form-label">Model:</label>
    <input type="text" name="model" class="form-input" onChange={handleChanger} value={inputs.model} required/>

    <label for="date" class="form-label">Date:</label>
    <input type="date" name="Date" class="form-input" onChange={handleChanger} value={inputs.Date} required/>

    <label for="manufacturer" class="form-label">Manufacturer:</label>
    <input type="text" name="manufacture" class="form-input" onChange={handleChanger} value={inputs.manufacture} />

    <label for="condition" class="form-label">Condition:</label>
    <input type="text" name="condition" class="form-input" onChange={handleChanger} value={inputs.condition} required/>

    <label for="note" class="form-label">Note:</label>
    <input type="text" name="note" class="form-input" onChange={handleChanger} value={inputs.note} required/>

    <button class="form-button">Update</button>
  </form>
</div>

    </center>    

    </div>
  )
}

export default Firearmpdate