import React, { useState } from 'react';
import { Select, Radio, Form, Input } from 'antd';
import "./AddTable.css";


const { Option } = Select;

function AddCurrentInmate({ formData, setFormData, setImage }) {
    const [form] = Form.useForm();

    const validateForm = () => {
        const requiredFields = ['image', 'fullname', 'initialname', 'birthday', 'gender', 'nic', 'address', 'contactnumber', 'emergencycontactname', 'emergencycontactnumber', 'marital', 'occupation', 'education', 'religion'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                return false; 
            }
        }
        return true; 
    };

    const validateFullName = (_, value) => {
        // Strip out invalid characters and update the form data
        const strippedValue = value.replace(/[^A-Za-z\s]/g, '');
        setFormData(prevState => ({ ...prevState, fullname: strippedValue }));
        return Promise.resolve();
    };

    const validateInitialName = (_, value) => {
        // Strip out invalid characters and update the form data
        const strippedValue = value.replace(/[^A-Za-z]/g, '');
        setFormData(prevState => ({ ...prevState, initialname: strippedValue }));
        return Promise.resolve();
    };

    const preventNIC = (_, value) => {
        // Strip out any symbols and update the form data
        const strippedValue = value.replace(/[^0-9vVxX\s]/g,'');
        setFormData(prevState => ({ ...prevState, nic: strippedValue }));
        return Promise.resolve();
    };   
    
    const preventContactNumber = (_, value) => {
        // Strip out any symbols and update the form data
        const strippedValue = value.replace(/[^\d+\s]/g,'');
        setFormData(prevState => ({ ...prevState, contactnumber: strippedValue }));
        return Promise.resolve();
    };

    const preventEmergencyContactNumber = (_, value) => {
        // Strip out any symbols and update the form data
        const strippedValue = value.replace(/[^\d+\s]/g,'');
        setFormData(prevState => ({ ...prevState, emergencycontactnumber: strippedValue }));
        return Promise.resolve();
    };

    const getMaxDate = () => {
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()); // Subtract 18 years from current date
        return maxDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
      };
    
      const getMinDate = () => {
        const currentDate = new Date();
        const minDate = new Date(currentDate.getFullYear() - 30, currentDate.getMonth(), currentDate.getDate()); // Subtract 30 years from current date
        return minDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
      };
    
      const [errors, setErrors] = useState({
        FirstNameError: '',
        LastNameError: '',
        NICError: '',
        ContactNumberError: '',
        EmergencyContactNumberError: '',
        DateOfBirthError: '' // Error state for date of birth validation
      });
  
    const validateDateOfBirth = (_, value) => {
        const currentDate = new Date();
        const selectedDate = new Date(value);
    
        // Calculate the minimum date required for a person to be at least 18 years old
        const minDateForAdult = new Date();
        minDateForAdult.setFullYear(currentDate.getFullYear() - 18);
    
        // Calculate the minimum date required to prevent dates more than 100 years ago
        const minDate = new Date();
        minDate.setFullYear(currentDate.getFullYear() - 100);
    
        if (selectedDate >= currentDate || selectedDate >= minDateForAdult || selectedDate <= minDate) {
            return Promise.reject('Date of Birth must be a past date, and the person should be at least 18 years old, and not more than 100 years old.');
        }
    
        return Promise.resolve();
    };
    

    const validateNIC = (_, value) => {
        const nicRegex = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/;
        if (!nicRegex.test(value)) {
            return Promise.reject('Invalid contact number format. Please enter a valid NIC with 12 numbers or 9 numbers with V or v.');
        }
        return Promise.resolve();
    };
    
        
    
    const validateContactNumber = (_, value) => {
        const regex = /^\+94\d{9}$/;
        if (!regex.test(value)) {
            return Promise.reject('Invalid NIC format. Please enter a valid contact number starting with +94.');
        }
        return Promise.resolve();
    };

    const onFinish = (values) => {
        if (validateForm()) {
            console.log('Received values:', values);
            // Perform form submission
        } else {
            console.log('Form validation failed');
        }
    };

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className="container">
            <Form
                form={form}
                name="addCurrentInmate"
                onFinish={onFinish}
                layout="vertical"
                initialValues={formData}
            >
                <Form.Item
                    className="InputName"
                    name="image"
                    label="Upload Inmate Photo"
                    rules={[
                        { required: true, message: 'Please upload inmate photo' }
                    ]}
                > 
                    <div className="InputName">                
                        <input
                            accept="image/*"
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="InputImage"/></div>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="fullname"
                    label="Full Name:"
                    rules={[
                        { required: true, message: 'Please enter full name' },
                        { validator: validateFullName }
                    ]}  
                > 
                    <div className="InputName"><Input className="InputField" value={formData.fullname} onChange={(e) => { setFormData({ ...formData, fullname: e.target.value }); }} /></div>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="initialname"
                    label="Name with Initials:"
                    rules={[
                        { required: true, message: 'Please enter Name with Initials (Ex:- John A B C)' },
                        { validator: validateInitialName }
                    ]}
                    >
                    <div className="InputName"><Input className="InputField" value={formData.initialname} onChange={(e) => { setFormData({ ...formData, initialname: e.target.value }); }} /></div>
                </Form.Item>

                <div className="flex">
                <Form.Item
                    className="InputName"
                    name="birthday"
                    label="Date of Birth:"
                    rules={[
                        { required: true, message: 'Please enter Date of Birth' },
                        { validator: validateDateOfBirth }
                    ]}
                >
                    <div className="InputName"></div><Input max={getMaxDate()} min={getMinDate()} type="date" className="InputFieldNew" value={formData.birthday} onChange={(e) => { setFormData({ ...formData, birthday: e.target.value }); }} />
                </Form.Item>
                    <div className="InputNameRadio"><Form.Item
                    className="InputName"
                    name="gender"
                    label="Gender:"
                    rules={[{ required: true, message: 'Please select Gender' }]}
                >
                        <Radio.Group className="InputRadio"  name="gender" value={formData.gender} onChange={(e) => { setFormData({ ...formData, gender: e.target.value }); }}>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                        </Radio.Group>
                </Form.Item></div>
                </div>

                <Form.Item
                    className="InputName"
                    name="nic"
                    label="NIC:"
                    rules={[
                        { required: true, message: 'Please enter NIC' },
                        { validator: validateNIC },
                        { validator: preventNIC },
                        
                    ]}
                >
                    <div className="InputName"><Input className="InputField" value={formData.nic} onChange={(e) => { setFormData({ ...formData, nic: e.target.value }); }}/></div>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="address"
                    label="Address:"
                    rules={[{ required: true, message: 'Please enter address' }]}
                >
                    <Input className="InputField" value={formData.address} onChange={(e) => { setFormData({ ...formData, address: e.target.value }); }}/>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="contactnumber"
                    label="Contact Number:"
                    rules={[
                        { required: true, message: 'Please enter contact number' },
                        { validator: validateContactNumber },
                        { validator: preventContactNumber },
                        
                    ]}
                >
                    <div className="InputName"><Input className="InputField" placeholder="+94XXXXXXXXX" value={formData.contactnumber} onChange={(e) => { setFormData({ ...formData, contactnumber: e.target.value }); }}/></div>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="emergencycontactname"
                    label="Emergency Contact Name:"
                    rules={[
                        { required: true, message: 'Please enter full name' }
                    ]}
                >
                    <Input className="InputField" value={formData.emergencycontactname} onChange={(e) => { setFormData({ ...formData, emergencycontactname: e.target.value }); }}/>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="emergencycontactnumber"
                    label="Emergency Contact Number:"
                    rules={[
                        { required: true, message: 'Please enter emergency contact number' },
                        { validator: validateContactNumber },
                        { validator: preventEmergencyContactNumber },
                    ]}
                >
                    <div className="InputName"><Input className="InputField" placeholder="+94XXXXXXXXX" value={formData.emergencycontactnumber} onChange={(e) => { setFormData({ ...formData, emergencycontactnumber: e.target.value }); }}/></div>
                </Form.Item>

                <Form.Item
                    name="marital"
                    label="Marital Status:"
                    rules={[{ required: true, message: 'Please select marital status' }]}
                >
                    <div className="InputDropdown2"><Select className="InputFieldDropdown" placeholder="Select marital status" style={{ width: '100%' }} value={formData.marital} onChange={(value) => handleChange('marital', value)}>
                        <Option value="Never Married">Never married</Option>
                        <Option value="Married">Married</Option>
                        <Option value="Widowed">Widowed</Option>
                        <Option value="Divorced">Divorced</Option>
                        <Option value="Legally Separated">Legally Separated</Option>
                    </Select></div>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="occupation"
                    label="Occupation:"
                    rules={[{ required: true, message: 'Please enter occupation' }]}
                    value={formData.occupation} onChange={(e) => { setFormData({ ...formData, occupation: e.target.value }); }}
                >
                    <Input className="InputField" />
                </Form.Item>

                <Form.Item
                    name="education"
                    label="Education Level:"
                    rules={[{ required: true, message: 'Please select education level' }]}
                >
                    <div className="InputDropdown2"><Select className="InputFieldDropdown" placeholder="Select education level" style={{ width: '100%' }} value={formData.education} onChange={(value) => handleChange('education', value)}>
                        <Option value="No Schooling">No Schooling</Option>
                        <Option value="Grade 1-5">Grade 1-5</Option>
                        <Option value="Passed Grade 5">Passed Grade 5</Option>
                        <Option value="Passed Grade 8">Passed Grade 8</Option>
                        <Option value="Passed O/Level">Passed G.C.E (O/L)</Option>
                        <Option value="Passed A/Level">Passed G.C.E (A/L)</Option>
                        <Option value="Graduate">Graduate</Option>
                        <Option value="Others">Others</Option>
                    </Select></div>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="religion"
                    label="Religion:"
                    rules={[{ required: true, message: 'Please select religion' }]}
                >
                    <div className="InputDropdown2"><Select className="InputFieldDropdown" placeholder="Select religion" style={{ width: '100%' }} value={formData.religion} onChange={(value) => handleChange('religion', value)}>
                        <Option value="Buddhism">Buddhism</Option>
                        <Option value="Hindu">Hindu</Option>
                        <Option value="Islam">Islam</Option>
                        <Option value="Roman Catholic">Roman Catholic</Option>
                        <Option value="Others">Others</Option>
                    </Select></div>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddCurrentInmate;
