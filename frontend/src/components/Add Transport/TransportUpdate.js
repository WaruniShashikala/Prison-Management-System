import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import {useNavigate} from 'react-router'
import Sidebar from '../Sidebar'
import './transportForm.css'

function TransportUpdate() {


    const [inputs,setInputs] =useState({});
    const history =useNavigate();
    const id= useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/transport/${id}`);
                setInputs(response.data.transport); 
            } catch (error) {
                console.error(error);
            }
        };
        fetchHandler();
    }, [id]);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setInputs((prevState) => ({
          ...prevState,
          Date: today,
        }));
      }, []);


    const sendRequest=async()=>{

        await axios.put(`http://Localhost:3500/transport/${id}`,{

            no:String(inputs.no),
            type:String(inputs.type),
            Date: inputs.date,   
            condition:String(inputs.condition),
            milage:String(inputs.milage),
            seat:String(inputs.seat),
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
        sendRequest().then(()=>history('/maintransport'))
    }

    const handleKeyDown = (e) => {
        const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
        if (!regex.test(e.key)) {
          e.preventDefault();
        }
      };

  return (


    <div>

        <Sidebar/>
        <center><h1>Transport Update</h1>

        <div className="transportform">

        <form onSubmit={handleSubmit} class="form-container">

<label for="no">No</label>
<input type="text" name="no" onChange={handleChanger} onKeyDown={handleKeyDown} value={inputs.no} class="form-input" required/>

<label for="type">Type</label>
{/* <input type="text" name="type" onChange={handleChanger} value={inputs.type} required/> */}
 <select name="type" onChange={handleChanger} value={inputs.type} class="form-select" required>
 <option value="">Select Type</option>
        <option value="prison bus">Prison bus</option>
        <option value="pvehicel">Police vehicel</option>
        <option value="van">Van</option>
   
</select> 

<label for="date">Date</label>
<input type="date" name="date" onChange={handleChanger} value={inputs.date} class="form-input" required/>

<label for="condition">Condition:</label>


<select name="condition" onChange={handleChanger} value={inputs.condition} class="form-select" required>
    <option value="">Select Condition</option>
    <option value="Good">Good</option>
    <option value="Fair">Fair</option>
    <option value="Poor">Poor</option>
   
</select>

<label for="milage">Mileage</label>
<input type="text" name="milage" onChange={handleChanger} value={inputs.milage} class="form-input" required/>

<label for="seat">Seat</label>
<input type="text" name="seat" onChange={handleChanger} value={inputs.seat} class="form-input" required/>

<label for="note">Note</label>
<input type="text" name="note" onChange={handleChanger} value={inputs.note} class="form-input" required/>

<button type="submit" className='transportsubmit'>Update</button>

</form>

</div>
        
        </center>
    </div>
  )
}

export default TransportUpdate