import React, { useState,useEffect } from 'react';
import axios from 'axios'; 
import "./UpdateJailor.css"
function UpdateJailor({ selectedJailor, onUpdate, updateJailor }) {
    const [inputs, setInputs] = useState(selectedJailor);


    useEffect(() => {
      const fetchJailorData = async () => {
          try {
              const response = await axios.get(`http://localhost:3500/Jailors/${selectedJailor._id}`);
              setInputs(response.data);
          } catch (error) {
              console.error('Error fetching jailor data:', error);
          }
      };
      fetchJailorData();
  }, [selectedJailor]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateJailor(selectedJailor._id, inputs);
    onUpdate(inputs);
};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label className='update-jailor-label'>First Name: </label>
    <input type="text" className='update-jailor-input' name="FirstName" value={inputs.FirstName} onChange={handleChange} /><br />

    <label className='update-jailor-label'>Last Name: </label>
    <input type="text" className='update-jailor-input' name="LastName" value={inputs.LastName} onChange={handleChange} /><br />
    <label className='update-jailor-label'>Date of Birth: </label>
    <input type="date" className='update-jailor-input' name="DateofBirth" value={inputs.DateofBirth} onChange={handleChange} /><br />

    <label className='update-jailor-label'>NIC: </label>
    <input type="text" className='update-jailor-input' name="NIC" value={inputs.NIC} onChange={handleChange} /><br />

    <label className='update-jailor-label'>Contact Number: </label>
    <input type="text" className='update-jailor-input' name="ContactNumber" value={inputs.ContactNumber} onChange={handleChange} /><br />

    <label className='update-jailor-label'>Emergency Contact Number: </label>
    <input type="text" className='update-jailor-input' name="EmergencyContactNumber" value={inputs.EmergencyContactNumber} onChange={handleChange} /><br />

    <label className='update-jailor-label'>Marital Status:</label>
    <select name="MaritalStatus" className='update-jailor-input' value={inputs.MaritalStatus} onChange={handleChange}>
    <option value="" disabled selected>Choose an option</option>
      <option value="married">Married</option>
      <option value="unmarried">Unmarried</option>
    </select><br />

    <label className='update-jailor-label'>Religion:</label>
    <select name="Religion" className='update-jailor-input' value={inputs.Religion} onChange={handleChange}>
    <option value="" disabled selected>Choose an option</option>
      <option value="buddhists">Buddhists</option>
      <option value="hindus">Hindus</option>
      <option value="muslims">Muslims</option>
      <option value="christians">Christians</option>
    </select><br />

    <label className='update-jailor-label'>Gender: </label>
    <input type="radio" id="male" name="Gender" value="male" onChange={handleChange} checked={inputs.Gender === "male"} />
    <label htmlFor="male" className='radio-lable'>Male</label>
    <input type="radio" id="female" name="Gender" value="female" onChange={handleChange} checked={inputs.Gender === "female"} />
    <label htmlFor="female" className='radio-lable'>Female</label>

    <h3>Employment Details</h3>
      <br/>
        
      <label className='update-jailor-label'>Job Title :</label>
      <select name="jobTitle" className='update-jailor-input' onChange={handleChange} value={inputs.jobTitle }>
      <option value="" disabled selected>Choose an option</option>
        <option value="CorrectionalOfficer">Correctional Officer</option>
        <option value="CorrectionalDeputy">Correctional Deputy</option>
        <option value="DetentionOfficer">Detention Officer</option>
        <option value="CorrectionalCounselor">Correctional Counselor</option>
          <option value="CorrectionalSergeant">Correctional Sergeant</option>
          <option value="CorrectionalLieutenant">Correctional Lieutenant</option>
          <option value="CorrectionalCaptain">Correctional Captain</option>
          <option value="CorrectionalAdministrator">Correctional Administrator</option>
          <option value="CorrectionalSupervisor">Correctional Supervisor</option>
      </select><br />
        
      <label className='update-jailor-label'>Department :</label>
      <select name="Department" className='update-jailor-input' onChange={handleChange} value={inputs.Department }>
      <option value="" disabled selected>Choose an option</option>
        <option value="Ablock">A Block (Staff Management Department)</option>
        <option value="Bblock">B Block (Inmate Management Department)</option>
<option value="Cblock">C Block (IT Department)</option>
          <option value="Dblock">D Block ()</option>
          <option value="Eblock">E Block (Space Planning and Utilization Department)</option>
          <option value="Fblock">F Block (Sanitation and Hygiene Department)</option>
          <option value="Gblock">G Block (Maintenance and Repairs Department)</option>
          <option value="Hblock">H Block (HR Department)</option>
      </select><br/>
       
      <label className='update-jailor-label'>Start Date: </label>
      <input type="date" name="StartDate" className='update-jailor-input' onChange={handleChange} value={inputs.StartDate }/><br />

      <h3>Qualifications and Training</h3><br/>
      <label className='update-jailor-label'>Educational Background : </label>
      <textarea name="EducationalBackground" rows="4" cols="50" className='update-jailor-input' onChange={handleChange} value={inputs.EducationalBackground }></textarea><br/>
      <label className='update-jailor-label'>Relevant Certifications (e.g. Correctional Officer Certification) : </label>
      <textarea name="RelevantCertifications" rows="4" cols="50" className='update-jailor-input' onChange={handleChange} value={inputs.RelevantCertifications }></textarea><br/>
      <label className='Addjailor-lable'>Training Courses Completed (e.g. First Aid,Crisis Management) : </label>
      <textarea name="TrainingCoursesCompleted" rows="4" cols="50" className='update-jailor-input' onChange={handleChange} value={inputs.TrainingCoursesCompleted }></textarea><br/>

      <h3>Uniform and Equipment</h3>
      <br/>
      <label className='update-jailor-label'>Uniform Size:</label>
      <select name="UniformSize" className='update-jailor-input' onChange={handleChange} value={inputs.UniformSize }>
      <option value="" disabled selected>Choose an option</option>
        <option value="small">S</option>
        <option value="Medium">M</option>
        <option value="Large">L</option>
        <option value="ExtraLarge">XL</option>
        <option value="DoubleExtraLarge">XXL</option>
        <option value="TripleExtraLarge">XXXL</option>
      </select>
      <br/>
      
      <label className='update-jailor-label'>Issued Equipment (e.g. handcuffs, radio):</label>
      <input type="text" name="IssuedEquipment" className='update-jailor-input' onChange={handleChange} value={inputs.IssuedEquipment }/>
      <br />

      <label className='update-jailor-label'>Equipment Training Status:</label>
      <textarea name="EquipmentTrainingStatus" rows="4" cols="50" className='update-jailor-input' onChange={handleChange} value={inputs.EquipmentTrainingStatus }></textarea>
      <br/>

      <h3>Health and Medical Information</h3>
      <br/>
      <label className='update-jailor-label'>Medical Conditions:</label>
      <textarea name="MedicalConditions" rows="4" cols="50" className='update-jailor-input' onChange={handleChange} value={inputs.MedicalConditions }></textarea>
      <br/>

      <label className='update-jailor-label'>Allergies:</label>
      <textarea name="Allergies" rows="4" cols="50" className='update-jailor-input' onChange={handleChange} value={inputs.Allergies }></textarea>
      <br/>

      <label className='update-jailor-label'>Emergency Medical Information:</label>
      <textarea name="EmergencyMedicalInformation" rows="4" cols="50" className='update-jailor-input' onChange={handleChange} value={inputs.EmergencyMedicalInformation }></textarea>
      <br/>
                <button type="submit" className='update-jailor-submit-button'>Submit</button>
            </form>
        </div>
    );
}

export default UpdateJailor;