import React, { useState } from 'react';
import { Form, Input, Checkbox, Select} from 'antd';
import "./AddTable.css";
const { TextArea } = Input;
const { Option } = Select;

function AddCurrentAdmission({ formData, setFormData }) {
    const [lifeImprisonment, setLifeImprisonment] = useState(false);

    const validateForm = () => {
        const requiredFields = ['inmatenumber', 'offense', 'sentence', 'Admission Date', 'cellNumber'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                return false; // Return false if any required field is empty
            }
        }
        return true; // All required fields are filled
    };

    const handleLifeImprisonmentChange = (e) => {
        setLifeImprisonment(e.target.checked);
    };

    const handleChange = (key, value) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const onFinish = (values) => {
        if (validateForm()) {
            console.log('Received values:', values);
            // Perform form submission
        } else {
            console.log('Form validation failed');
        }
    };

    return (
        <div className="formContainer">
            <Form
                name="addCurrentAdmission"
                action="POST"
                layout="vertical"
                onFinish={onFinish}
                className="pageContent"         
            >

                <Form.Item className="InputName" label="Inmate Number" name="inmatenumber" required>
                    <Input className="InputField" value={formData.inmatenumber} onChange={(e) => { setFormData({ ...formData, inmatenumber: e.target.value }); }} />
                </Form.Item>

                <Form.Item label="Offense" name="offense" rules={[{ required: true, message: 'Please select offense' }]}>
                    <div className="InputDropdown2"><Select className="InputFieldDropdown" placeholder="Select offense" value={formData.offense} onChange={(value) => handleChange('offense', value)}>
                        <Option value="Burglary">Burglary</Option>
                        <Option value="Robbery">Robbery</Option>
                        <Option value="Trespass">Trespass / House breaking</Option>
                        <Option value="Extortion">Extortion</Option>
                        <Option value="Looting">Looting </Option>
                        <Option value="Cattle Theft">Cattle Theft</Option>
                        <Option value="Acceptance or Retention of stolen Property">Acceptance or Retention of stolen Property</Option>
                        <Option value="Cheating">Cheating</Option>
                        <Option value="Criminal Breach of Trust">Criminal Breach of Trust</Option>
                        <Option value="Criminal Misappropriation">Criminal Misappropriation</Option>
                        <Option value="Arson">Arson</Option>
                        <Option value="Causing Damage">Causing Damage</Option>
                        <Option value="Theft">Theft</Option>
                        <Option value="Forgery">Forgery</Option>
                        <Option value="Counterfeiting of currency">Counterfeiting of currency</Option>
                        <Option value="Bribery">Bribery</Option>
                        <Option value="Cruelty to animals">Cruelty to animals</Option>
                        <Option value="Appearing in Public Places Drunk">Appearing in Public Places Drunk</Option>
                        <Option value="Behaviour in a Disorderly Manner">Behaviour in a Disorderly Manner</Option>
                        <Option value="Counterfeiting of currency">Counterfeiting of currency</Option>
                        <Option value="Clearing of Crown Land">Clearing of Crown Land</Option>
                        <Option value="Committing Affray">Committing Affray</Option>
                        <Option value="Failure to report to Police">Failure to report to Police</Option>
                        <Option value="Giving False evidence"> Giving False evidence</Option>
                        <Option value="Managing a Brothel">Managing a Brothel</Option>
                        <Option value="Possessing Prohibited Knife">Possessing Prohibited Knife</Option>
                        <Option value="Obstruction of Government Officers">Obstruction of Government Officers</Option>
                        <Option value="Profiteering">Profiteering</Option>
                        <Option value="Rioting">Rioting</Option>
                        <Option value="Unlawful Assembly">Unlawful Assembly</Option>
                        <Option value="Unlawful Betting and Gambling">Unlawful Betting and Gambling</Option>
                        <Option value="Using Explosives to kill fish">Using Explosives to kill fish</Option>
                        <Option value="Viewing of Blue Films">Viewing of Blue Films</Option>
                        <Option value="Gemming illegally">Gemming illegally</Option>
                        <Option value="Possessing Guns">Possessing Guns, Pistols etc. without License</Option>
                        <Option value="Other Offences Against Public Tranquility State Law and Order">Other Offences Against Public Tranquility State Law and Order</Option>
                        <Option value="Excise Offences">Excise Offences</Option>
                        <Option value="Maintenance">Maintenance</Option>
                        <Option value="Motor Offences">Motor Offences</Option>
                        <Option value="Narcotic drugs Offences">Narcotic drugs Offences</Option>
                        <Option value="Cruelty to Children">Cruelty to Children</Option>
                        <Option value="Sexual Abuse of Children">Sexual Abuse of Children</Option>
                        <Option value="Having Sexual Intercourse with Children">Having Sexual Intercourse with Children</Option>
                        <Option value="Unnatural Offences">Unnatural Offences ( With Children Under 16 Years )</Option>
                        <Option value="Rape of a Girl">Rape of a Girl ( Under 16 Years )</Option>
                        <Option value="Other Offences">Other Offences</Option>
                    </Select></div>
                </Form.Item>

                <Form.Item label="Sentence" name="sentence" rules={[{ required: true, message: 'Please select sentence' }]}>
                    <div className="InputDropdown2"><Select className="InputFieldDropdown2" placeholder="Select sentence" value={formData.sentence} onChange={(value) => handleChange('sentence', value)}>
                        <Option value="Imprisonment">Imprisonment</Option>
                        <Option value="Imprisonment with Hard Labor">Imprisonment with Hard Labor</Option>
                        <Option value="Life Imprisonment">Life Imprisonment</Option>
                        <Option value="Death Penalty">Death Penalty</Option>
                        <Option value="Probation">Probation</Option>
                        <Option value="Imprisonment with Probation">Imprisonment with Probation</Option>
                        <Option value="Imprisonment with Fine">Imprisonment with Fine</Option>
                        <Option value="Other">Other</Option>
                    </Select></div>
                </Form.Item>

                <Form.Item>
                    <Checkbox className="check" onChange={handleLifeImprisonmentChange}>If the inmate is sentenced to Life Imprisonment or Death Penalty check this checkbox.</Checkbox>
                </Form.Item>

                <Form.Item className="InputFieldDuration" label="Admission Date" name="admissionDate" rules={[{ required: true, message: 'Please select admission date' }]}>
                    <Input className="InputField" type="date" value={formData.admissionData} onChange={(e) => { setFormData({ ...formData, admissionDate: e.target.value }); }} />
                </Form.Item>

                <Form.Item className="InputFieldDuration1" label="Estimated Release Date" name="releaseDate" rules={[{ required: true, message: 'Please select release date' }]} hidden={lifeImprisonment}>
                    <Input className="InputField" type="date" value={formData.releaseData} onChange={(e) => { setFormData({ ...formData, releaseDate: e.target.value }); }} />
                </Form.Item>

                <Form.Item className="durationName" label="Sentence Duration" name="duration" hidden={lifeImprisonment} rules={[{ required: true, message: 'Please select the duration' }]}>
                    <div className="durationContainer">
                        <Form.Item className="Duration" name="years"noStyle>
                            <Input className="Duration" type="number" value={formData.years} onChange={(e) => { setFormData({ ...formData, years: e.target.value }); }} placeholder="Years" min={0} max={100} />
                        </Form.Item>
                        <Form.Item className="Duration" name="months" noStyle>
                            <Input className="Duration" type="number" value={formData.months} onChange={(e) => { setFormData({ ...formData, months: e.target.value }); }} placeholder="Months" min={0} max={11} />
                        </Form.Item>
                        <Form.Item className="Duration" name="days" noStyle>
                            <Input className="Duration" type="number" value={formData.days} onChange={(e) => { setFormData({ ...formData, days: e.target.value }); }} placeholder="Days" min={0} max={30}/>
                        </Form.Item>
                    </div>
                </Form.Item>

                <Form.Item label="Cell Number" name="cellNumber" rules={[{ required: true, message: 'Please select cell number' }]}>
                    <div className="InputDropdown"><Select className="InputFieldDropdown" placeholder="Select cell number" value={formData.cellNumber} onChange={(value) => handleChange('cellNumber', value)}>
                        <Option value="A1">A1</Option>
                        <Option value="A2">A2</Option>
                        <Option value="A3">A3</Option>
                        <Option value="A4">A4</Option>
                        <Option value="A5">A5</Option>
                        <Option value="B1">B1</Option>
                        <Option value="B2">B2</Option>
                        <Option value="B3">B3</Option>
                        <Option value="B4">B4</Option>
                        <Option value="B5">B5</Option>
                        <Option value="C1">C1</Option>
                        <Option value="C2">C2</Option>
                        <Option value="C3">C3</Option>
                        <Option value="C4">C4</Option>
                        <Option value="C5">C5</Option>
                    </Select></div>
                </Form.Item>

                <Form.Item label="Medical Conditions (If any)" name="medicalConditions" className="textAreaContainer">
                    <div className="textArea">
                        <TextArea rows={4} value={formData.medicalConditions} onChange={(e) => { setFormData({ ...formData, medicalConditions: e.target.value }); }} />
                    </div>
                </Form.Item>

                <Form.Item className="TextAreaContainer" label="Additional Notes (If any)" name="additionalNotes">
                    <div className="textArea">
                        <TextArea rows={4} size="fixed" value={formData.additionalNotes} onChange={(e) => { setFormData({ ...formData, additionalNotes: e.target.value }); }} />
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddCurrentAdmission;
