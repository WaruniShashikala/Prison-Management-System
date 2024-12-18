import React from 'react';
import "./JailorHealthandEqumentInfo.css";

function JailorHealthandEqumentInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='form3'style={{width:650}}>
      <h3>Uniform and Equipment</h3>
      <br/>
      <label className='Addjailor-label'>Uniform Size:</label>
      <select name="UniformSize" className='addjailorinputs' onChange={handleChange} value={formData.UniformSize }>
      <option value="" disabled selected>Choose an option</option>
        <option value="small">S</option>
        <option value="Medium">M</option>
        <option value="Large">L</option>
        <option value="ExtraLarge">XL</option>
        <option value="DoubleExtraLarge">XXL</option>
        <option value="TripleExtraLarge">XXXL</option>
      </select>
      <br/>
      
      <label className='Addjailor-label'>Issued Equipment (e.g. handcuffs, radio):</label>
      <input type="text" name="IssuedEquipment" className='addjailorinputs' onChange={handleChange} value={formData.IssuedEquipment }/>
      <br />

      <label className='Addjailor-label'>Equipment Training Status:</label>
      <textarea name="EquipmentTrainingStatus" rows="4" cols="50" className='addjailorinputs' onChange={handleChange} value={formData.EquipmentTrainingStatus }></textarea>
      <br/>

      <h3>Health and Medical Information</h3>
      <br/>
      <label className='Addjailor-label'>Medical Conditions:</label>
      <textarea name="MedicalConditions" rows="4" cols="50" className='addjailorinputs' onChange={handleChange} value={formData.MedicalConditions }></textarea>
      <br/>

      <label className='Addjailor-label'>Allergies:</label>
      <textarea name="Allergies" rows="4" cols="50" className='addjailorinputs' onChange={handleChange} value={formData.Allergies }></textarea>
      <br/>

      <label className='Addjailor-label'>Emergency Medical Information:</label>
      <textarea name="EmergencyMedicalInformation" rows="4" cols="50" className='addjailorinputs' onChange={handleChange} value={formData.EmergencyMedicalInformation }></textarea>
      <br/>

    </div>
  );
}

export default JailorHealthandEqumentInfo;
