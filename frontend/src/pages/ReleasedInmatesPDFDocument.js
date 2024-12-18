import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import prisonLogo from '../img/prisonlogo5.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  section: {
    margin: 10,
    padding: 10,
    paddingTop: 5,
    flexGrow: 1,
    marginLeft: 20,
    marginTop: 15
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
    color: '#4682B4'
  },
  address: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 5,
    marginLeft: 83,
    color: '#4682B4'
  },
  contact: {
    fontSize: 12.5,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 2,
    marginLeft: 150,
    color: '#4682B4'
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
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
  inmateImage: {
    width: '230%',
    height: 170,
    marginBottom: 80,
    marginLeft: -3
  },
  headersection: {
    border: 1, 
    width: 550,
    marginLeft: -8,
    padding: 10,
    paddingBottom: 5,
    paddingLeft: 20,
    backgroundColor: '#FAFAFA',
  },
  hr: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1.5,
    marginVertical: 2,
    width: 545,
    marginLeft: -5
  },
  topic: {
    fontSize: 15,
    fontWeight: 'bolder',
    marginBottom: 10,
    marginTop: 12,
    color: '#4682B4',
    marginLeft: 110
  },
  label: {
    width: 470,
    fontSize: 13,
    marginTop: 2,
    marginBottom: 3, 
  },
  value: {
    fontSize: 13,
    marginLeft: 175,
    marginTop: -17, 
    marginBottom: 5, 
  },
  footer: {
    width: 20,
    fontSize: 13,
    marginLeft: -150
  },
  footervalue: {
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 5,
    marginRight: 150
  },
  footerContainer: {
    marginRight: 150,
    marginLeft: 10,
    marginTop: 810,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  footer: {
    fontSize: 12,
    marginRight: 410,
    marginLeft: -205
  },
  footerdate: {
    fontSize: 12,
    marginRight: 370,
    marginLeft: -265
  }
});

const ReleasedInmatesPDFDocument = ({ selectedInmate }) => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Display the prison logo image */}
          <View style={styles.headersection}>
            <Image source={prisonLogo} style={[styles.image, styles.logoImage]} />
            <Text style={styles.address}>Prison Headquarters, No.150, Baseline Road, Colombo 09.</Text>
            <Text style={styles.contact}>+94-11-4677177 / +94-11-4677180.</Text>         
          </View>

          <Text style={styles.topic}>--- RELEASED INMATE DETAILS REPORT ---</Text>

          <Text style={styles.title}>- Personal Information -</Text>
          {/* Display the inmate photo if available */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {selectedInmate.image && (
              <Image
                source={{ uri: `http://localhost:3500/uploads/${selectedInmate.image}` }}
                style={[styles.image, styles.inmateImage]}
                
              />
            )}
            <View style={{ marginLeft: 20 }}>
              {/* Labels and values */}
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>:    {selectedInmate.fullname}</Text>

              <Text style={styles.label}>Name with Initials</Text>
              <Text style={styles.value}>:    {selectedInmate.initialname}</Text>

              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.value}>:    {selectedInmate.birthday ? new Date(selectedInmate.birthday).toISOString().split('T')[0] : ''}</Text>

              <Text style={styles.label}>Gender</Text>
              <Text style={styles.value}>:    {selectedInmate.gender}</Text>

              <Text style={styles.label}>NIC</Text>
              <Text style={styles.value}>:    {selectedInmate.nic}</Text>

              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>:    {selectedInmate.address}</Text>

              <Text style={styles.label}>Contact Number</Text>
              <Text style={styles.value}>:    {selectedInmate.contactnumber}</Text>

              <Text style={styles.label}>Emergency Contact Name</Text>
              <Text style={styles.value}>:    {selectedInmate.emergencycontactname}</Text>

              <Text style={styles.label}>Emergency Contact Number</Text>
              <Text style={styles.value}>:    {selectedInmate.emergencycontactnumber}</Text>

              <Text style={styles.label}>Marital Status</Text>
              <Text style={styles.value}>:    {selectedInmate.marital}</Text>

              <Text style={styles.label}>Occupation</Text>
              <Text style={styles.value}>:    {selectedInmate.occupation}</Text>

              <Text style={styles.label}>Education</Text>
              <Text style={styles.value}>:    {selectedInmate.education}</Text>

              <Text style={styles.label}>Religion</Text>
              <Text style={styles.value}>:    {selectedInmate.religion}</Text>
            </View>
          </View>

          <Text style={styles.title}>- Admission & Release Details -</Text>

          <Text style={styles.label}>Past Inmate Number</Text>
          <Text style={styles.value}>:    {selectedInmate.inmatenumber}</Text>

          <Text style={styles.label}>The Offense Commited</Text>
          <Text style={styles.value}>:    {selectedInmate.offense}</Text>

          <Text style={styles.label}>Sentence</Text>
          <Text style={styles.value}>:    {selectedInmate.sentence}</Text>

          <Text style={styles.label}>Admission Date</Text>
          <Text style={styles.value}>:    {selectedInmate.admissionDate ? new Date(selectedInmate.admissionDate).toISOString().split('T')[0] : ''}</Text>

          <Text style={styles.label}>Estimated Release Date</Text>
          <Text style={styles.value}>:    {selectedInmate.releaseDate ? new Date(selectedInmate.releaseDate).toISOString().split('T')[0] : ''}</Text>

          <Text style={styles.label}>Estimated Sentence Duration</Text>
          <Text style={styles.value}>:    {selectedInmate.years} years, {selectedInmate.months} months, {selectedInmate.days} days</Text>

          <Text style={styles.label}>Stayed Cell Number</Text>
          <Text style={styles.value}>:    {selectedInmate.cellNumber}</Text>

          <Text style={styles.label}>Released Date</Text>
          <Text style={styles.value}>:    {selectedInmate.realReleaseDate ? new Date(selectedInmate.realReleaseDate).toISOString().split('T')[0] : ''}</Text>

          <Text style={styles.label}>Reason to Release</Text>
          <Text style={styles.value}>:    {selectedInmate.releaseReason}</Text>

          <Text style={styles.label}>Release By (Officer Name)</Text>
          <Text style={styles.value}>:    {selectedInmate.releaseBy}</Text>

          <Text style={styles.label}>Inmate Status</Text>
          <Text style={styles.value}>:    {selectedInmate.status}</Text>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerdate}>Date: ............................</Text>

          <Text style={styles.footer}>Check By: ..................................</Text>

          <Text style={styles.footer}>Signature: ............................</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default ReleasedInmatesPDFDocument;
