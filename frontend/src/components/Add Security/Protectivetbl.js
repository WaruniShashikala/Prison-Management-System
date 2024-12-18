import React, { useEffect,useState,useRef } from 'react'
import Sidebar from '../Sidebar'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";

import "./Protective.css";
const URL="http://Localhost:3500/protective";

function Protectivetbl() {

  const [users, setUsers] = useState([]);
  const [printableRecord, setPrintableRecord] = useState(null); 
  const componentRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        if (response.data && response.data.protective) {
          setUsers(response.data.protective);
        } else {
          console.error( response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const deleteHandler=async(protectiveId)=>{

    try {
      await axios.delete(`${URL}/${protectiveId}`);
     
      const response = await axios.get(URL);
      if (response.data && response.data.protective) {
        setUsers(response.data.protective);
      }
    } catch (error) {
      console.error('Error deleting protective:', error);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "User Report",
    onAfterPrint: () => {
      setPrintableRecord(null); // Reset the printable record after printing
      alert("User report successfully downloaded!");
    },
  });


const handlePrintRecord = (record) => {
    setPrintableRecord(record);
    handlePrint(); // Call handlePrint to print the record
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.note.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (

    <div>
        <Sidebar/>
        <center><h1>Protective Gears Table</h1>

        <input
          
          type="text"
          placeholder="Search..."

          style={{
            padding: '8px',
            border: '1px solid #ccc',
            marginTop:'20px',
            
            borderRadius: '4px',
            width: '200px' 
          }} 
          value={searchQuery}
          onChange={handleSearch}
          />


        <table className='protecttbl'>
    <thead className='Fireamtble-thead'>
        <tr className='Fireamtble-tr'>
            
            <th className='Fireamtble-th'>Name</th>
            <th className='Fireamtble-th'>Model</th>
            <th className='Fireamtble-th'>Date</th>
            <th className='Fireamtble-th'>Manufacturer</th>
            <th className='Fireamtble-th'>Condition</th>
            <th className='Fireamtble-th'>Quantity</th>
            <th className='Fireamtble-th'>Size</th>
            <th className='Fireamtble-th'>Note</th>
            <th className='protecttbl-th'>Action</th>
            
        </tr>
    </thead>
    <tbody>

          {filteredUsers.map((Protect) => (
              <tr key={Protect._id}>
                
                <td className='Fireamtble-td'>{Protect.name}</td>
                <td className='Fireamtble-td'>{Protect.model}</td>
                <td className='Fireamtble-td'>{formatDate(Protect.Date)}</td>
                <td className='Fireamtble-td'>{Protect.manufacture}</td>
                <td className='Fireamtble-td'>{Protect.condition}</td>
                <td className='Fireamtble-td'>{Protect.quantity}</td>
                <td className='Fireamtble-td'>{Protect.size}</td>
                <td className='Fireamtble-td'>{Protect.note}</td>

                <td className='protecttbl-td'> 
                <Link to={`/protectivepage/${Protect._id}`}><button class="btn btn-update">Update</button></Link>
                <button class="btn btn-delete" onClick={() => deleteHandler(Protect._id)}>Delete</button>
                <button class="btnupdate" onClick={() => handlePrintRecord(Protect)}>Print</button>

            </td>
              </tr>
            ))}
        
    </tbody>
</table>

<Link to="/protectiveform" className="securityform">
<button class="btn" id="btn-add">Add</button>
</Link>
       
        </center>

        {printableRecord && (

<div style={{ display: "none" }}>

  <div className="printable-record" ref={componentRef}>
    <h1 className="medtitle">Protective Gears Records</h1>
    <div className="meddetailset">
    <p className="meddetails">Gear Name :{printableRecord.name}</p>
    <p className="meddetails">Gear Model: {printableRecord.model}</p>
    <p className="meddetails">Date : {formatDate(printableRecord.Date)}</p>
    <p className="meddetails">Manufacture: {printableRecord.manufacture}</p>
    <p className="meddetails">Condition: {printableRecord.condition}</p>
    <p className="meddetails">Quantitity: {printableRecord.quantity}</p>
    <p className="meddetails">Gear Size: {printableRecord.size}</p>
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
  )
}

export default Protectivetbl