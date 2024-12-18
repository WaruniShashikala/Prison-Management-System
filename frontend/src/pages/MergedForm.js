import React, { useState } from 'react';
import axios from "axios";
import { message, Progress } from 'antd';
import AddCurrentAdmission from './AddCurrentAdmission';
import AddCurrentInmate from './AddCurrentInmate';

function MergedForm() {
    const [page, setPage] = useState(0);
    const [image, setImage] = useState("");
    const [formData, setFormData] = useState({
        image:"",
        fullname: "",
        initialname: "",
        birthday: "",
        gender: "",
        nic: "",
        address: "",
        contactnumber: "",
        emergencycontactname: "",
        emergencycontactnumber: "",
        marital: "",
        occupation: "",
        education: "",
        religion: "",
        inmatenumber:"",
        offense: "",
        sentence: "",
        admissionDate: "",
        releaseDate: "",
        years: "",
        months: "",
        days: "",
        cellNumber: "",
        medicalConditions: "",
        additionalNotes: "",
        realReleaseDate: "",
        releaseReason: "",
        releaseBy: "",
        confirmReleased: "",
        status: "",
        escapedDate: "",
        escapedTime: "",
        escapedLocation: "",
        physicalDescription: "",
        clothingDescription: "",
        foundDate: ""
    });

        // Validation function to check if all required fields are filled
        const validateForm = () => {
            // Check for required fields based on the current page
            if (page === 0) {
                const requiredFields = ['fullname', 'initialname', 'birthday', 'gender', 'nic', 'address', 'contactnumber', 'emergencycontactname', 'emergencycontactnumber', 'marital', 'occupation', 'education', 'religion'];
                for (const field of requiredFields) {
                    if (!formData[field]) {
                        return false; 
                    }
                }
            } else {
                const requiredFields = ['inmatenumber', 'offense', 'sentence', 'admissionDate'];
                for (const field of requiredFields) {
                    if (!formData[field]) {
                        return false; 
                    }
                }
            }
            return true; 
        };

        // Handle form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Perform form submission if on the last page
            if (page === FormTitles.length - 1) {
                try {
                    // Your form submission logic
                    const formDataToSend = new FormData();
                    formDataToSend.append('image', image); 
                    for (const key in formData) {
                        if (key === 'status') {
                            formDataToSend.append(key, 'Current');
                        } else {
                            formDataToSend.append(key, formData[key]);
                        }
                    }
                    await axios.post("http://localhost:3500/inmate/addinmates", formDataToSend);
                    message.success('New inmate added successfully.');

                    window.location.href = '/current';
                } catch (error) {
                    // Handle errors
                    message.error('Failed to add the new inmate.');
                    console.error('Error:', error);
                }
            } else {
                // Proceed to the next page
                setPage(page + 1);
            }
        } else {
            // Display error message for incomplete form
            message.error('Please fill out all required fields.');
        }
    };


    const FormTitles = ["- Personal Information -", "- Admission and Release Details -"];

    const PageDisplay = () => {
        if (page === 0) {
            return <AddCurrentInmate formData={formData} setFormData={setFormData} setImage={setImage} />;
        } else {
            return <AddCurrentAdmission formData={formData} setFormData={setFormData} />;
        }
    };

    return (
        <div className="mergedform" style={{ border: '1px solid #000000', width: 650, padding: 20, paddingLeft: 57, borderRadius: 8}}>
            <h2 className="MainHeader">- CURRENT INMATE DETAILS -</h2>
            <div className="Progress">
                <Progress className="progressBar" percent={(page + 1) * 50} strokeColor="#86B6F6" />
            </div>
            <div className="form_container">
                <div className="title" style={{ fontSize: 11, marginLeft: -1 }}>
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className="formcontent">{PageDisplay()}</div>
                <div className="bottombuttons">
                    <button className="rightbutton"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}>
                        Previous
                    </button>
                    <button className="leftbutton" style={{ marginRight: 180}}
                        onClick={(e) => handleSubmit(e)}>
                        {page === FormTitles.length - 1 ? "Submit" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MergedForm;
