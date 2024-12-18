import React, { useEffect,useState,useRef } from 'react'
import Sidebar from '../Sidebar'
import "./Firearmtbl.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";

const URL="http://Localhost:3500/firearm";



function Firearmtbl() {

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [printableRecord, setPrintableRecord] = useState(null); 
  const componentRef = useRef();
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        if (response.data && response.data.firearm) {
          setUsers(response.data.firearm);
        } else {
          console.error( response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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

  
  const deleteHandler=async(firearmId)=>{

    try {
      await axios.delete(`${URL}/${firearmId}`);
     
      const response = await axios.get(URL);
      if (response.data && response.data.firearm) {
        setUsers(response.data.firearm);
      }
    } catch (error) {
      console.error('Error deleting firearm:', error);
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


  return (
    <div>

        <Sidebar/>


        <center>
          
          <h1>Firearms Table</h1>

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


          <table className='Fireamtble'>
    <thead className='Fireamtble-thead'>
        <tr className='Fireamtble-tr'>
            
            <th className='Fireamtble-th'>Name</th>
            <th className='Fireamtble-th'>Model</th>
            <th className='Fireamtble-th'>Date</th>
            <th className='Fireamtble-th'>Manufacturer</th>
            <th className='Fireamtble-th'>Condition</th>
            <th className='Fireamtble-th'>Note</th>
            <th className='Fireamtble-th'>Action</th>
            
        </tr>
    </thead>
    <tbody>

          {filteredUsers.map((fire) => (
              <tr key={fire._id}>
                {/* <td>{fire.id}</td> */}
                <td className='Fireamtble-td'>{fire.name}</td>
                <td className='Fireamtble-td'>{fire.model}</td>
                <td className='Fireamtble-td'>{formatDate(fire.Date)}</td>
                <td className='Fireamtble-td'>{fire.manufacture}</td>
                <td className='Fireamtble-td'>{fire.condition}</td>
                <td className='Fireamtble-td'>{fire.note}</td>

                <td>
                <Link to={`/firearmpage/${fire._id}`}><button class="btn btn-update">Update</button></Link>
                <button class="btn btn-delete" onClick={() => deleteHandler(fire._id)}>Delete</button>
                <button class="btnupdate" onClick={() => handlePrintRecord(fire)}>Print</button>
            </td>
              </tr>
            ))}
        
    </tbody>
</table>

<Link to="/securityform" className="securityform">
<button class="btn" id="btn-add">Add</button>
</Link>

        
        </center>

        {printableRecord && (

<div style={{ display: "none" }}>

  <div className="printable-record" ref={componentRef}>
    <h1 className="medtitle">Firearms Records</h1>
    <div className="meddetailset">
    <p className="meddetails">Firearm Name :{printableRecord.name}</p>
    <p className="meddetails">Firearm Model: {printableRecord.model}</p>
    <p className="meddetails">Date Aquired: {formatDate(printableRecord.Date)}</p>
    <p className="meddetails">Manufacture: {printableRecord.manufacture}</p>
    <p className="meddetails">Condition: {printableRecord.condition}</p>
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

export default Firearmtbl