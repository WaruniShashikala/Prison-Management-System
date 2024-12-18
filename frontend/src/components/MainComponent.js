import React from 'react';
import Header from './SideNavbar';

function MainComponent() {
  const userName = "John"; 
  return (
    <div>
      <Header userName={userName} />
    </div>
  );
}

export default MainComponent;
