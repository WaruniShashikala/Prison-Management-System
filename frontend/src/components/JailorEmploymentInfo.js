import React from 'react';
import "./JailorEmploymentInfo.css";

function JailorEmploymentInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='form2'style={{width:650}}>
      <h3>Employment Details</h3>
      <br/>
        
      <label className='Addjailor-lable'>Job Title :</label>
      <select name="jobTitle" className='addjailorinputs' onChange={handleChange} value={formData.jobTitle }>
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
        
      <label className='Addjailor-lable'>Department :</label>
      <select name="Department" className='addjailorinputs' onChange={handleChange} value={formData.Department }>
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
       
      <label className='Addjailor-lable'>Start Date: </label>
      <input type="date" name="StartDate" className='addjailorinputs' onChange={handleChange} value={formData.StartDate }/><br />

      <h3>Qualifications and Training</h3><br/>
      <label className='Addjailor-lable'>Educational Background : </label>
      <textarea name="EducationalBackground" rows="4" cols="50" className='addjailorinputs' onChange={handleChange} value={formData.EducationalBackground }></textarea><br/>
      <label className='Addjailor-lable'>Relevant Certifications (e.g. Correctional Officer Certification) : </label>
      <textarea name="RelevantCertifications" rows="4" cols="50" className='addjailorinputs' onChange={handleChange} value={formData.RelevantCertifications }></textarea><br/>
      <label className='Addjailor-lable'>Training Courses Completed (e.g. First Aid,Crisis Management) : </label>
      <textarea name="TrainingCoursesCompleted" rows="4" cols="50" className='addjailorinputs' onChange={handleChange} value={formData.TrainingCoursesCompleted }></textarea><br/>

    </div>
  );
}

export default JailorEmploymentInfo;
