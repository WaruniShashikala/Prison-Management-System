import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
// import prisonLogo from '../img/prison.jpg';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 150,
  },
  departmentDetails: {
    marginLeft: 20,
  },
  departmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  address: {
    fontSize: 14,
    marginBottom: 5,
    color: '#4682B4',
  },
  contact: {
    fontSize: 14,
    marginBottom: 5,
    color: '#4682B4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4682B4',
  },
  tableContainer: {
    marginTop: 10,
    border: '1px solid #000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderBottom: '1px solid #000',
    padding: 5,
  },
  tableHeaderCell: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    padding: 5,
  },
  tableRowCell: {
    fontSize: 12,
    padding: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    marginRight: 10,
    color: '#4682B4',
  },
  signature: {
    fontSize: 12,
    color: '#4682B4',
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US');
};

const MedicinePrint = ({ filteredUsers }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      {/* <Image src={prisonLogo} style={styles.logo} /> */}
      <View style={styles.departmentDetails}>
        <Text style={styles.departmentName}>Sri Lanka Prison Department</Text>
        <Text style={styles.address}>Prison Headquarters, No.150,Baseline Road, Colombo 09.</Text>
        <Text style={styles.contact}>+94-11-4677177 / +94-11-4677180.</Text>
      </View>
    </View>

    <Text style={styles.title}>User Report</Text>

    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Name</Text>
        <Text style={styles.tableHeaderCell}>Type</Text>
        <Text style={styles.tableHeaderCell}>MG</Text>
        <Text style={styles.tableHeaderCell}>Quantity</Text>
        <Text style={styles.tableHeaderCell}>Expire Date</Text>
        <Text style={styles.tableHeaderCell}>Supplier</Text>
        <Text style={styles.tableHeaderCell}>Note</Text>
      </View>
      {filteredUsers.map((Medicine) => (
        <View style={styles.tableRow} key={Medicine._id}>
          <Text style={styles.tableRowCell}>{Medicine.name}</Text>
          <Text style={styles.tableRowCell}>{Medicine.type}</Text>
          <Text style={styles.tableRowCell}>{Medicine.mg}</Text>
          <Text style={styles.tableRowCell}>{Medicine.quantity}</Text>
          <Text style={styles.tableRowCell}>{formatDate(Medicine.expire)}</Text>
          <Text style={styles.tableRowCell}>{Medicine.supplier}</Text>
          <Text style={styles.tableRowCell}>{Medicine.note}</Text>
        </View>
      ))}
    </View>

    <View style={styles.footer}>
      <Text style={styles.date}>Date: {formatDate(new Date())}</Text>
      <Text style={styles.signature}>Authorized Signature: ___________________</Text>
    </View>
  </View>
);

export default MedicinePrint;
