import React from 'react';
import SecurityStaffSidebar from './SecurityStaffSidebar';
import SecurityStaffHome from './SecurityStaffHome';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
  },
  flexContainer: {
    display: 'flex',
    width: '100%',
  },
  content: {
    width: 'calc(100% - 250px)', 
  },
};

const SecurityDashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.flexContainer}>
        <SecurityStaffSidebar />
        <div style={styles.content}>
          <SecurityStaffHome />
        </div>
      </div>
    </div>
  );
}

export default SecurityDashboard;
