import React ,{ useEffect, useState ,useRef} from 'react'
import Sidebar from '../Sidebar'
import "./Transport.css" ;
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const URL = "http://Localhost:3500/transport";



function Transport() {

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [printableRecord, setPrintableRecord] = useState(null); // State to hold the printable record
  const componentRef = useRef();
  //const history=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        if (response.data && response.data.transport) {
          setUsers(response.data.transport);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (transportId) => {
    try {
      await axios.delete(`${URL}/${transportId}`);

      const response = await axios.get(URL);
      if (response.data && response.data.transport) {
        setUsers(response.data.transport);
      }
    } catch (error) {
      console.error("Error deleting transport:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.note.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "User Report",
    onAfterPrint: () => {
      setPrintableRecord(null); // Reset the printable record after printing
      //alert("User report successfully downloaded!");
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

      <Sidebar/>
      <center>
        <h1>Transportation resources </h1>

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

        <table className='tabletransport'>
    <thead>
        <tr>
            <th>Vehical No</th>
            <th>Vehical Type</th>
            <th>Date</th>
            <th>Condition</th>
            <th>Mileage</th>
            <th>Seat</th>
            <th>Note</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    {filteredUsers.map((Transport) => (
              <tr key={Transport._id}>
                
                <td>{Transport.no}</td>
                <td>{Transport.type}</td>
                <td>{formatDate(Transport.Date)}</td>
                <td>{Transport.condition}</td>
                <td>{Transport.milage}</td>
                <td>{Transport.seat}</td>
                <td>{Transport.note}</td>
            <td>
            <Link to={`/transportpage/${Transport._id}`}>
              <button class="btnupdatetransport">Update</button>
            </Link>

                <button class="btndeletetransport" onClick={() => deleteHandler(Transport._id)}>Delete</button>

                <button class="btnupdate" onClick={() => handlePrintRecord(Transport)}>Print</button>
            </td>
        </tr>
    ))}
    </tbody>
</table>

<Link to="/transportform" >
<button class="btnaddtransport" id="addBtn">Add</button>
</Link>

      </center>


      {printableRecord && (

<div style={{ display: "none" }}>

  <div className="printable-record" ref={componentRef}>
    <h1 className="medtitle">Transportation Records</h1>
    <div className="meddetailset">
    <p className="meddetails">Vehical No :{printableRecord.no}</p>
    <p className="meddetails">Type: {printableRecord.type}</p>
    <p className="meddetails">Date : {formatDate(printableRecord.Date)}</p>
    <p className="meddetails">Condition: {printableRecord.condition}</p>
    <p className="meddetails">Mailage: {printableRecord.milage}</p>
    <p className="meddetails">Seat: {printableRecord.seat}</p>
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

export default Transport