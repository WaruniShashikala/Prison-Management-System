import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import './healthrecordView.css';
import HealthRecordPDF from './HealthRecordPrint';

function ViewHealthRecordModal ({ visible, onCancel, record }) {

  const [isVisiblePDFModal, setIsVisiblePDFModal] = useState(false);
  const [selectedRecord, setselectedRecord] = useState(null);

  const showPDFModal = (record) => {
    setselectedRecord(record);
    setIsVisiblePDFModal(true);
  };
  
  return (
    <Modal
      title={<span style={{ fontSize: '24px', margin: '10px', color:'#86B6F6' }}>Health Record</span>}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closeIcon={<span className="close">X</span>}
      width={500}
      style={{ marginTop: -50, marginBottom: 120 }}
    >
      {record && (
        <div className="record-details">
          <p><strong className="label">Inmate Name:</strong> {record.InmateName}</p>
          <p><strong className="label">Date of Birth:</strong> {record.dateOfBirth ? moment(record.dateOfBirth).format('YYYY-MM-DD') : ''}</p>
          <p><strong className="label">Diagnosis:</strong> {record.diagnosis}</p>
          <p><strong className="label">Medications:</strong> {record.medications}</p>
          <p><strong className="label">Notes:</strong> {record.notes}</p>
          <p className="margin"><strong className="label">Date:</strong> {record.date ? moment(record.date).format('YYYY-MM-DD') : ''}</p>
          <div>
            <button className="downloadpdf" onClick={() => showPDFModal(record)}>Download PDF</button>
          </div>
        </div>

      )}
              <Modal
                  visible={isVisiblePDFModal}
                  onCancel={() => setIsVisiblePDFModal(false)}
                  footer={null}
                  closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                  width={800}
                >
                  {record && <HealthRecordPDF record={record} />}
              </Modal>
    </Modal>
    
  );
}

export default ViewHealthRecordModal;
