import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import './healthRecordForm.css';

const UpdateHealthRecordForm = ({ visible, onCancel, healthRecord, fetchHealthRecords }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (healthRecord) {
            form.setFieldsValue({
                InmateName: healthRecord.InmateName,
                dateOfBirth: healthRecord.dateOfBirth ? moment(healthRecord.dateOfBirth).subtract(1, 'days') : null,
                diagnosis: healthRecord.diagnosis,
                medications: healthRecord.medications,
                notes: healthRecord.notes,
            });
        }
    }, [healthRecord, form]);

    // Custom validator function for Diagnosis field
    const validateDiagnosis = (_, value) => {
        if (!/^[a-zA-Z ]+$/.test(value)) {
            return Promise.reject('Diagnosis must include only letters');
        }
        return Promise.resolve();
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.put(`http://localhost:3500/healthrecord/updatehealthrecords/${healthRecord._id}`, values);
            console.log('Success:', response.data);
            message.success('Health record updated successfully');
            onCancel();
            fetchHealthRecords();
        } catch (error) {
            console.error('Error:', error.response.data);
            message.error('Failed to update health record');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={<span style={{ fontSize: '24px', fontWeight: '700' }}>Update Health Record</span>}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            closeIcon={<span className="close">X</span>}
            width={500}
            style={{ marginTop: -50, marginBottom: 120 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
            <Form.Item
                name="InmateName"
                label="Inmate Name"
                rules={[
                    { required: true, message: 'Please enter inmate name' },
                    { pattern: /^[a-zA-Z. ]+$/, message: 'Inmate Name must include only letters and "." symbol' }
                ]}
            >
                <Input />
            </Form.Item>
                <Form.Item
                    name="dateOfBirth"
                    label="Date of Birth"
                    rules={[
                        { required: true, message: 'Please enter date of birth' },
                        () => ({
                            validator(_, value) {
                                const eighteenYearsAgo = moment().subtract(18, 'years');
                                if (!value || value.isBefore(eighteenYearsAgo)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Date of Birth must be at least 18 years ago'));
                            },
                        }),
                    ]}
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                    name="diagnosis"
                    label="Diagnosis"
                    rules={[
                        { required: true, message: 'Please enter diagnosis' },
                        { validator: validateDiagnosis }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="medications"
                    label="Medications"
                    rules={[{ required: true, message: 'Please enter medications' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="notes"
                    label="Notes"
                >
                    <Input.TextArea style={{ resize: 'none' }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="updateButton">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateHealthRecordForm;
