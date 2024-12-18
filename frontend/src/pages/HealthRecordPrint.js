import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import moment from 'moment';
import prisonLogo from '../img/prisonlogo5.png';

// Create styles for PDF document
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      fontSize: 12,
      backgroundColor: '#ffffff',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      marginLeft: 30,
      marginTop: 15
    },
    header: {
      fontSize: 24,
      marginTop: 20,
      marginBottom: 40,
      textAlign: 'center',
      marginLeft: 130,
      color: '#333',
    },
    address: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 0,
      marginTop: 5,
      marginLeft: 100,
    },
    contact: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 2,
      marginTop: 2,
      marginLeft: 160,
    },
    image: {
      width: 120,
      height: 150,
      resizeMode: 'cover',
    },
    logoImage: {
      width: 500,
      marginBottom: 3,
      height: 80,
      marginLeft: 13
    },
    hr: {
      borderBottomColor: '#000000',
      borderBottomWidth: 1.5,
      marginVertical: 2,
      width: 545,
      marginLeft: -15
    },
    fieldLabel: {
      fontWeight: 'bolder',
      color: '#000',
      marginBottom: 5,
      marginLeft: 50,
      width: 450,
      fontSize: 13,
      marginTop: 2,
      marginBottom: 3, 
    },
    fieldValue: {
      color: '#444',
      marginBottom: 10,
      marginLeft: 50,
      fontSize: 13,
      marginLeft: 170,
      marginTop: -17, 
      marginBottom: 5,
    },
    fieldValueNotes: {
      color: '#444',
      marginBottom: 10,
      marginLeft: 50,
      fontSize: 13,
      marginLeft: 190,
      marginTop: -17, 
      marginBottom: 5,
    },
    field: {
      marginBottom: 10,
    },
    footerContainer: {
      marginRight: 50,
      marginLeft: 120,
      marginTop: 785,
      display: 'flex',
      flexDirection: 'row',
    },
    footer: {
      fontSize: 12,
      marginRight: 380,
      marginLeft: -120
    },
    footerdate: {
      fontSize: 12,
      marginRight: 450,
      marginLeft: -275
    }
});

// HealthRecordPDF component to render PDF document
const HealthRecordPDF = ({ record }) => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
          <Image source={prisonLogo} style={[styles.image, styles.logoImage]} />
          <Text style={styles.address}>Prison Headquarters,No.150,Baseline Road,Colombo 09.</Text>
          <Text style={styles.contact}>+94-11-4677177 / +94-11-4677180.</Text>
          <View style={styles.hr} /> 
        <Text style={styles.header}>- Health Record Report -</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Inmate Name</Text>
          <Text style={styles.fieldValue}>:     {record.InmateName}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Date of Birth</Text>
          <Text style={styles.fieldValue}>:     {record.dateOfBirth ? moment(record.dateOfBirth).format('YYYY-MM-DD') : ''}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Diagnosis</Text>
          <Text style={styles.fieldValue}>:     {record.diagnosis}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Medications</Text>
          <Text style={styles.fieldValue}>:     {record.medications}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Notes                        :     </Text>
          <Text style={styles.fieldValueNotes}>{record.notes}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Date</Text>
          <Text style={styles.fieldValue}>:     {record.date ? moment(record.date).format('YYYY-MM-DD') : ''}</Text>
        </View>
      </View>
      <View style={styles.footerContainer}>
          <Text style={styles.footerdate}>Date: .................................</Text>

          <Text style={styles.footer}>Signature: ................................</Text>
        </View>
    </Page>
  </Document>
  </PDFViewer>
);

export default HealthRecordPDF;
