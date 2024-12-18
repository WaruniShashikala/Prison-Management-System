import React from 'react';
import { PDFViewer,Document, Page, Text, View, StyleSheet ,Image,} from '@react-pdf/renderer';
import governmentLogo from '../../img/prisonlogo5.png';

const TaskReport = ({ task }) => (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
      <Image src={governmentLogo} style={styles.image} />
          <View style={styles.contactussection}>
            <Text style={styles.content}>Contact Numbers: (+4)114677177 / (+94)114677180 | Address: Prison Headquarters,No. 150,Baseline Road,Colombo</Text>
          </View>
          <View style={styles.hr} />
        <Text style={styles.heading}>Task Details</Text>
        <View style={styles.task}>
          <Text style={styles.content}>Description: {task.description}</Text>
          <Text style={styles.content}>Status: {task.status}</Text>
          <Text style={styles.content}>Priority: {task.priority}</Text>
          <Text style={styles.content}>Assigned To: {task.assignedTo}</Text>
          <Text style={styles.content}>Due Date: {task.dueDate}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
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
          </View>
    </Page>
  </Document>
  </PDFViewer>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  task: {
    marginTop:10,
    marginBottom: 10,
  },
  heading: {
    marginTop:20,
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  },
  contactussection:{
    marginHorizontal: 50,
    textAlign: 'center',
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
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

export default TaskReport;
