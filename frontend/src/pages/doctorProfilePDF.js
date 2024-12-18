import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image,} from '@react-pdf/renderer';
import governmentLogo from '../img/prisonlogo5.png'; // Assuming the correct path to the image

const styles = StyleSheet.create({
    section: {
        margin: 10,
        padding: 10,
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
      contactussection:{
        marginHorizontal: 50,
        textAlign: 'center',
      },
      content: {
        fontSize: 12,
        marginBottom: 5,
      },
      heading: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
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
      DoctorfooterText: {
       
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
     
})

const DoctorProfilePDF = ({ doctor }) => (
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
          </View> 
          <View style={styles.table}>
          <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>First Name:</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.FirstName}</Text>
              </View>
              </View>
              <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>Last Name:</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.LastName}</Text>
              </View>
              </View>
              <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>Date of Birth :</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.DateofBirth}</Text>
              </View>
              </View>
              

              <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>NIC :</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.NIC}</Text>
              </View>
              </View>

              <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>ContactNumber :</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.ContactNumber}</Text>
              </View>
              </View>

              <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>Gender :</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.Gender}</Text>
              </View>
              </View>

              <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>Specialty :</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.Specialty}</Text>
              </View>
              </View>

              <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>MedicalLicenseNumber :</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.MedicalLicenseNumber}</Text>
              </View>
              </View>

              <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>EducationalBackground :</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.EducationalBackground}</Text>
              </View>
              </View>


              <View style={styles.tableRow}>
              <View style={styles.tableCell}>
              <Text style={styles.content}>StartDate :</Text>

              </View>
              <View style={styles.tableCell}>
                <Text style={styles.content}>{doctor.StartDate}</Text>
              </View>
              
              </View>
              <Text style={{marginTop: 200,fontSize:12}}>Remarks :</Text>
              <View style={styles.Doctorfooter}>
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
          <Text style={styles.DoctorfooterText}>Contact Numbers: (+4)114677177 / (+94)114677180 | Address: Prison Headquarters,No. 150,Baseline Road,Colombo</Text>
        </View>

              </View>
</Page>
        </Document>
        </PDFViewer>
);
export default DoctorProfilePDF;