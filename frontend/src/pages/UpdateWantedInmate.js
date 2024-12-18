import React, { useState, useEffect } from 'react';
import { Input} from 'antd';
import './updateInmateStyle.css';

const { TextArea } = Input;

const UpdateWantedInmate = ({ selectedInmate, updateInmate, onUpdate }) => {
    const [updatedInmateData, setUpdatedInmateData] = useState(selectedInmate);
    const [lifeImprisonment, setLifeImprisonment] = useState(false);

    useEffect(() => {
        // Format date values before setting the state
        const formattedSelectedInmate = {
            ...selectedInmate,
            birthday: selectedInmate.birthday ? selectedInmate.birthday.split('T')[0] : null,
            admissionDate: selectedInmate.admissionDate ? selectedInmate.admissionDate.split('T')[0] : null,
            releaseDate: selectedInmate.releaseDate ? selectedInmate.releaseDate.split('T')[0] : null,
            escapedDate: selectedInmate.escapedDate ? selectedInmate.escapedDate.split('T')[0] : null
        };
        setUpdatedInmateData(formattedSelectedInmate);
    }, [selectedInmate]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateInmate(selectedInmate._id, updatedInmateData);
        onUpdate(updatedInmateData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInmateData({ ...updatedInmateData, [name]: value });
    };

    const handleLifeImprisonmentChange = (e) => {
        const isChecked = e.target.checked;
        setLifeImprisonment(isChecked);
        if (isChecked) {
            // If checkbox is checked, hide the release date input field and set its value to null
            setUpdatedInmateData({ ...updatedInmateData, releaseDate: null });
        }
    };
    

    return (
        <div className="updateinmatecontainer">
            <form onSubmit={handleSubmit}>
                <div>
                    <h1 className="updateTitle">- UPDATE INMATE DETAILS -</h1>
                    <h3 className="subtopic1">- Personal Information -</h3>
                    <label htmlFor="fullname">Full Name:</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={updatedInmateData.fullname}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="initialname">Name with Initials:</label>
                    <input
                        type="text"
                        id="initialname"
                        name="initialname"
                        value={updatedInmateData.initialname}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="birthday">Date of Birth:</label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={updatedInmateData.birthday}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={updatedInmateData.gender}
                        onChange={handleInputChange}
                        required 
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="nic">NIC:</label>
                    <input
                        type="text"
                        id="nic"
                        name="nic"
                        value={updatedInmateData.nic}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={updatedInmateData.address}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="contactnumber">Contact Number:</label>
                    <input
                        type="text"
                        id="contactnumber"
                        name="contactnumber"
                        value={updatedInmateData.contactnumber}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="emergencycontactname">Emergency Contact Name:</label>
                    <input
                        type="text"
                        id="emergencycontactname"
                        name="emergencycontactname"
                        value={updatedInmateData.emergencycontactname}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="emergencycontactnumber">Emergency Contact Number:</label>
                    <input
                        type="text"
                        id="emergencycontactnumber"
                        name="emergencycontactnumber"
                        value={updatedInmateData.emergencycontactnumber}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="marital">Marital Status:</label>
                    <select
                        id="marital"
                        name="marital"
                        value={updatedInmateData.marital}
                        onChange={handleInputChange}
                        required 
                    >
                        <option value="Never Married">Never married</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Legally Separated">Legally Separated</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="occupation">Occupation:</label>
                    <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={updatedInmateData.occupation}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="education">Education Level:</label>
                    <select
                        id="education"
                        name="education"
                        value={updatedInmateData.education}
                        onChange={handleInputChange}
                        required 
                    >
                        <option value="No Schooling">No Schooling</option>
                        <option value="Grade 1-5">Grade 1-5</option>
                        <option value="Passed Grade 5">Passed Grade 5</option>
                        <option value="Passed Grade 8">Passed Grade 8</option>
                        <option value="Passed O/Level">Passed G.C.E (O/L)</option>
                        <option value="Passed A/Level">Passed G.C.E (A/L)</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="religion">Religion:</label>
                    <select
                        id="religion"
                        name="religion"
                        value={updatedInmateData.religion}
                        onChange={handleInputChange}
                        required 
                    >
                        <option value="Buddhism">Buddhism</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Islam">Islam</option>
                        <option value="Roman Catholic">Roman Catholic</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <h3 className="subtopic2">- Admission & Release Details -</h3>
                <div>
                    <label htmlFor="inmatenumber">Inmate Number:</label>
                    <input
                        type="text"
                        id="inmatenumber"
                        name="inmatenumber"
                        value={updatedInmateData.inmatenumber}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="Offense">Offense:</label>
                    <select
                        id="Offense"
                        name="Offense"
                        value={updatedInmateData.Offense}
                        onChange={handleInputChange}
                        required 
                    >
                        <option value="Burglary">Burglary</option>
                        <option value="Robbery">Robbery</option>
                        <option value="Trespass">Trespass / House breaking</option>
                        <option value="Extortion">Extortion</option>
                        <option value="Looting">Looting </option>
                        <option value="Cattle Theft">Cattle Theft</option>
                        <option value="Acceptance or Retention of stolen Property">Acceptance or Retention of stolen Property</option>
                        <option value="Cheating">Cheating</option>
                        <option value="Criminal Breach of Trust">Criminal Breach of Trust</option>
                        <option value="Criminal Misappropriation">Criminal Misappropriation</option>
                        <option value="Arson">Arson</option>
                        <option value="Causing Damage">Causing Damage</option>
                        <option value="Theft">Theft</option>
                        <option value="Forgery">Forgery</option>
                        <option value="Counterfeiting of currency">Counterfeiting of currency</option>
                        <option value="Bribery">Bribery</option>
                        <option value="Cruelty to animals">Cruelty to animals</option>
                        <option value="Appearing in Public Places Drunk">Appearing in Public Places Drunk</option>
                        <option value="Behaviour in a Disorderly Manner">Behaviour in a Disorderly Manner</option>
                        <option value="Counterfeiting of currency">Counterfeiting of currency</option>
                        <option value="Clearing of Crown Land">Clearing of Crown Land</option>
                        <option value="Committing Affray">Committing Affray</option>
                        <option value="Failure to report to Police">Failure to report to Police</option>
                        <option value="Giving False evidence"> Giving False evidence</option>
                        <option value="Managing a Brothel">Managing a Brothel</option>
                        <option value="Possessing Prohibited Knife">Possessing Prohibited Knife</option>
                        <option value="Obstruction of Government Officers">Obstruction of Government Officers</option>
                        <option value="Profiteering">Profiteering</option>
                        <option value="Rioting">Rioting</option>
                        <option value="Unlawful Assembly">Unlawful Assembly</option>
                        <option value="Using Explosives to kill fish">Using Explosives to kill fish</option>
                        <option value="Viewing of Blue Films">Viewing of Blue Films</option>
                        <option value="Gemming illegally">Gemming illegally</option>
                        <option value="Possessing Guns">Possessing Guns, Pistols etc. without License</option>
                        <option value="Other Offences Against Public Tranquility State Law and Order">Other Offences Against Public Tranquility State Law and Order</option>
                        <option value="Unlawful Betting and Gambling">Unlawful Betting and Gambling</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Motor Offences">Motor Offences</option>
                        <option value="Narcotic drugs Offences">Narcotic drugs Offences</option>
                        <option value="Cruelty to Children">Cruelty to Children</option>
                        <option value="Sexual Abuse of Children">Sexual Abuse of Children</option>
                        <option value="Having Sexual Intercourse with Children">Having Sexual Intercourse with Children</option>
                        <option value="Unnatural Offences">Unnatural Offences ( With Children Under 16 Years )</option>
                        <option value="Rape of a Girl">Rape of a Girl ( Under 16 Years )</option>
                        <option value="Other Offences">Other Offences</option>
                        <option value="Excise Offences">Excise Offences</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sentence">Sentence:</label>
                    {lifeImprisonment ? (
                        <span>Life Imprisonment</span>
                    ) : (
                        <select
                            id="sentence"
                            name="sentence"
                            value={updatedInmateData.sentence}
                            onChange={handleInputChange}
                            required 
                        >
                            <option value="Imprisonment">Imprisonment</option>
                            <option value="Imprisonment with Hard Labor">Imprisonment with Hard Labor</option>
                            <option value="Life Imprisonment">Life Imprisonment</option>
                            <option value="Death Penalty">Death Penalty</option>
                            <option value="Probation">Probation</option>
                            <option value="Imprisonment with Probation">Imprisonment with Probation</option>
                            <option value="Imprisonment with Fine">Imprisonment with Fine</option>
                            <option value="Other">Other</option>
                        </select>
                    )}
                    <br></br>
                    <input
                        type="checkbox"
                        id="lifeImprisonment"
                        name="lifeImprisonment"
                        checked={lifeImprisonment}
                        onChange={handleLifeImprisonmentChange}
                        required 
                    />
                    <label htmlFor="lifeImprisonment">If the inmate is sentenced to Life Imprisonment or Death Penalty check this checkbox.</label>
                </div>

                <div className="admission">
                    <label htmlFor="admissionDate">Admission Date:</label>
                    <input
                        type="date"
                        id="admissionDate"
                        name="admissionDate"
                        value={updatedInmateData.admissionDate}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                    {!lifeImprisonment && (
                        <div>
                            <label htmlFor="releaseDate">Release Date:</label>
                            <input
                                type="date"
                                id="releaseDate"
                                name="releaseDate"
                                value={updatedInmateData.releaseDate}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                    )}
                <div>
                    <label htmlFor="cellNumber">Cell Number:</label>
                    <select
                        id="cellNumber"
                        name="cellNumber"
                        value={updatedInmateData.cellNumber}
                        onChange={handleInputChange}
                        required 
                    >
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="A3">A3</option>
                        <option value="A4">A4</option>
                        <option value="A5">A5</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="B3">B3</option>
                        <option value="B4">B4</option>
                        <option value="B5">B5</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                        <option value="C3">C3</option>
                        <option value="C4">C4</option>
                        <option value="C5">C5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="medicalConditions">Medical Conditions (If any):</label>
                    <TextArea
                        type="text"
                        id="medicalConditions"
                        name="medicalConditions"
                        className="textarea"
                        value={updatedInmateData.medicalConditions}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="additionalNotes">Additional Notes (If any):</label>
                    <TextArea
                        type="text"
                        id="additionalNotes"
                        name="additionalNotes"
                        className="textarea"
                        value={updatedInmateData.additionalNotes}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={updatedInmateData.status}
                        onChange={handleInputChange}
                        required 
                    >
                        <option value="" disabled defaultValue>Select the status</option>
                        <option value="Current">Current</option>
                        <option value="Released">Released</option>
                        <option value="Wanted">Wanted</option>
                    </select>
                </div>
                {/* Escaped Date */}
                <div>
                    <label htmlFor="escapedDate">Escaped Date:</label>
                    <input
                        type="date"
                        id="escapedDate"
                        name="escapedDate"
                        value={updatedInmateData.escapedDate}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Escaped Time */}
                <div>
                    <label htmlFor="escapedTime">Escaped Time:</label>
                    <input
                        type="time"
                        id="escapedTime"
                        className="escapedTime"
                        name="escapedTime"
                        value={updatedInmateData.escapedTime}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Escaped Location */}
                <div>
                    <label htmlFor="escapedLocation">Escaped Location (prison name, city, state):</label>
                    <input
                        type="text"
                        id="escapedLocation"
                        name="escapedLocation"
                        value={updatedInmateData.escapedLocation}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Physical Description */}
                <div>
                    <label htmlFor="physicalDescription">Physical Description (height, weight, distinguishing features):</label>
                    <input
                        type="text"
                        id="physicalDescription"
                        name="physicalDescription"
                        value={updatedInmateData.physicalDescription}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Clothing description at the time of escape */}
                <div>
                    <label htmlFor="clothingDescription">Clothing description at the time of escape (if known):</label>
                    <input
                        type="text"
                        id="clothingDescription"
                        name="clothingDescription"
                        value={updatedInmateData.clothingDescription}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <button type="submit" className="update_Btn">UPDATE</button>
            </form>
        </div>
    );
};

export default UpdateWantedInmate;
