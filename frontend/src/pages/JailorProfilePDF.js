import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image,} from '@react-pdf/renderer';
import governmentLogo from '../img/prisonlogo5.png'; // Assuming the correct path to the image

const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: 450,
    height: 80,
    marginLeft: 50,
  },
  hr: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { 
    flexDirection: 'row',
  },
  tableCell: { 
    
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flex: 1,
    padding: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 10,
  },
  contactussection:{
    marginHorizontal: 50,
    textAlign: 'center',
  },
  tableContentHeading:{
    fontSize:15,
    backgroundColor:"black",
    color:'white',
    padding:5
  },
 
 
});

const JailorProfilePDF = ({ jailor }) => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src={governmentLogo} style={styles.image} />
          <View style={styles.contactussection}>
            <Text style={styles.content}>Contact Numbers: (+4)114677177 / (+94)114677180 | Address: Prison Headquarters,No. 150,Baseline Road,Colombo</Text>
          </View>
          <View style={styles.hr} />
          <Text style={styles.heading}>Jailor Details</Text>
          <View style={styles.table}>
          <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableContentHeading}>Personal Information:</Text>
              </View>
              </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>First Name:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.FirstName}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Last Name:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.LastName}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Date Of Birth:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.DateOfBirthr}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>NIC:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.NIC}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Contact Number:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.ContactNumber}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Emergency Contact Number:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.EmergencyContactNumber}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Marital Status:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.MaritalStatus}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Religion:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.Religion}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Gender:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.Gender}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableContentHeading}>Employment Details & Qualification and Training Information:</Text>
              </View>
              </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Job Title:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.jobTitle}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Department:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.Department}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Start Date:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.StartDate}</Text>
              </View>
            </View>


            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Educational Background:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.EducationalBackground}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Relevant Certifications:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.RelevantCertifications}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Training Courses Completed:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.TrainingCoursesCompleted}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableContentHeading}>Uniform and Equipment & Health and Medical Information:</Text>
              </View>
              </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Uniform Size:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.UniformSize}</Text>
              </View>
            </View>


            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Issued Equipment:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.IssuedEquipment}</Text>
              </View>
            </View>


            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Equipment Training Status:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.EquipmentTrainingStatus}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Medical Conditions:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.MedicalConditions}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Allergies:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.Allergies}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.content}>Emergency Medical Information:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{jailor.EmergencyMedicalInformation}</Text>
              </View>
            </View>
           
          </View>
          <Text style={{marginTop: 50,fontSize:12}}>Remarks :</Text>
        </View>
        
        <View style={styles.footer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <View style={{ width: '30%', height: 50, borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 25,marginLeft:10 }}>
        <Text style={{marginTop: 50,textAlign: 'center',fontSize:12}}>Date</Text>
        </View>

    <View style={{ width: '30%', height: 50, borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 25 }}>
    <Text style={{marginTop: 50,textAlign: 'center',fontSize:12}}>Head of Prison Department</Text>
    </View>
    
    <View style={{ width: '30%', height: 50, borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 25 ,marginRight:10}}>
    <Text style={{marginTop: 50,textAlign: 'center',fontSize:12}}>Commissioner of Prison</Text>
    </View>
   
          </View>
        
        <View style={styles.hr} />
          <Text style={styles.footerText}>Contact Numbers: (+4)114677177 / (+94)114677180 | Address: Prison Headquarters,No. 150,Baseline Road,Colombo</Text>
        </View>
      </Page>

      
        
     
    </Document>
  </PDFViewer>
);

export default JailorProfilePDF;
