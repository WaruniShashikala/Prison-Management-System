import { Routes,Route } from "react-router-dom";

import Public from "./components/Public";
import Login from "./features/auth/Login";

import Staff from "./pages/Staff";

import AddJailor from "./pages/addJailor"
import JailorList from "./pages/JailorList";
import UpdateJailor from "./components/UpdateJailor";

import CurrentInmates from "./pages/CurrentInmates";
import ReleasedInmates from "./pages/ReleasedInmates";
import WantedInmates from "./pages/WantedInmates";
import HealthcareAppointments from "./pages/HealthcareAppointments";
import InmateSchedule from "./pages/InmateSchedule";
import Dashboard from "./pages/Dashboard";
import AddCurrentInmate from "./pages/AddCurrentInmate";
import AddCurrentAdmission from "./pages/AddCurrentAdmission";

import HealthcareDashboard from "./pages/HealthcareDashboard";
import CurrentAppointments from "./pages/CurrentAppointments";
import ApprovedAppointments from "./pages/ApprovedAppointments";
import AllHealthRecords from "./pages/AllHealthRecords";

import Security from "./components/Add Security/Security";
import Transport from "./components/Add Transport/Transport";
import Medicine from "./components/Add medicine/Medicine";
import Firearmtbl from "./components/Add Security/Firearmtbl";
import Lethal from "./components/Add Security/Lethal";
import Protectivetbl from "./components/Add Security/Protectivetbl";
import Securityform from "./components/Add Security/Securityform";
import Firearmpdate from "./components/Add Security/Firearmpdate";
import AdminDashboard from './components/adminDashbord'
import MedicineUpdate from "./components/Add medicine/MedicineUpdate"
import MedicineForm from "./components/Add medicine/MedicineForm";
import TransportUpdate from "./components/Add Transport/TransportUpdate"
import TransportForm from "./components/Add Transport/TransportForm";

import ProtectiveForm from "./components/Add Security/ProtectiveForm";
import LethelForm from "./components/Add Security/LethelForm";
import LethelUpdate from "./components/Add Security/LethelUpdate";
import ProtectiveUpdate from "./components/Add Security/ProtectiveUpdate";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisitorDashboard from './visitor/VisitorDashboard';
import AllVisitors from './visitor/AllVisitors';
import AllVisits from './visit/AllVisits'
import Summrychart from './visit/Summrychart';


import RehabilitationDashboard from './Rehabilitation and Education/RehabilitationDashboard';
import AllEducations from './Rehabilitation and Education/education/AllEducations';
import AllEvents from './Rehabilitation and Education/events/AllEvents';
import AllTrainings from './Rehabilitation and Education/vocationalTraining/AllTrainings';
import AllReintegrations from './Rehabilitation and Education/Reintegration/AllReintegrations';
import UpcommingEvents from './Rehabilitation and Education/events/UpcommingEvents';
import PastEvents from './Rehabilitation and Education/events/PastEvents';
import EducationHome from './Rehabilitation and Education/education/EducationHome';
import YouthEducation from './Rehabilitation and Education/education/YouthEducation';
import AdultEducation from './Rehabilitation and Education/education/AdultEducation';
import DigitalEducation from './Rehabilitation and Education/education/DigitalEducation';

import SecurityDashboard from './SecurityAndIncident/SecurityDashboard';
import AllSecurityStaff from './SecurityAndIncident/AllSecurityStaff';
import AllIncident from './SecurityAndIncident/Incident Management/AllIncident';
import DoctorList from "./pages/DoctorList";


import Home from "./components/Home/Home";
import AddTask from './components/AddTask/AddTask'; // Correct the path
import Tasks from './components/Tasks/Tasks'; // Correct the path
import UpdateTask from './components/UpdateTask/UpdateTask';
import Task from './components/Task/Task';
function App() {
  return (
    <div>
      
      <ToastContainer />
    
    <Routes>
      
        <Route index element={<Public/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="staff" element={<Staff/>}/>
        <Route path="Admindashbord" element={<AdminDashboard/>}/>
       <Route path="JailorList" element={<JailorList/>}/>
       <Route path="DoctorList" element={<DoctorList/>}/>
        <Route path="addjailor" element={<AddJailor/>}/>
        <Route path="/JailorList/:id" element={<UpdateJailor />} />

        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="current" element={<CurrentInmates/>} />
        <Route path="/released" element={<ReleasedInmates />} />
        <Route path="/wanted" element={<WantedInmates />} />
        <Route path="/appointments" element={<HealthcareAppointments />} />
        <Route path="/schedule" element={<InmateSchedule />} />
        <Route path="/addCurrent" element={<AddCurrentInmate />} />
        <Route path="/addCurrentAdmission" element={<AddCurrentAdmission />} />

        <Route path="/healthcareDashboard" element={<HealthcareDashboard />} />
        <Route path="/currentAppointments" element={<CurrentAppointments />} />
        <Route path="/approvedAppointments" element={<ApprovedAppointments />} />
        <Route path="/healthRecords" element={<AllHealthRecords />} />
        
        <Route path="/" element={<Security/>}/>
          <Route path="/mainsecurity" element={<Security/>}/>
          <Route path="/maintransport" element={<Transport/>}/>
          <Route path="/mainmedical" element={<Medicine/>}/>

          <Route path="/firearmpage" element={<Firearmtbl/>}/>
          <Route path="/lethalpage" element={<Lethal/>}/>
          <Route path="/protectivepage" element={<Protectivetbl/>}/>

          <Route path="/securityform" element={<Securityform/>}/>
          
          {/* update part for firearm*/}

          <Route path="/firearmpage/:id" element={<Firearmpdate/>}/>
          <Route path="/medicinepage/:id" element={<MedicineUpdate/>}/>
          <Route path="/medicineform" element={<MedicineForm/>}/>
          <Route path="/transportpage/:id" element={<TransportUpdate/>}/>
          <Route path="/transportform" element={<TransportForm/>}/>
          <Route path="/protectiveform" element={<ProtectiveForm/>}/>
          <Route path="/lethelform" element={<LethelForm/>}/>
          <Route path="/lethalpage/:id" element={<LethelUpdate/>}/>
          <Route path="/protectivepage/:id" element={<ProtectiveUpdate/>}/>

          {/* visitor management */}
          <Route path="/visitorDashboard" element={<VisitorDashboard />} />
          <Route path="/allVisitors" element={<AllVisitors />} />
          <Route path="/allVisits" element={<AllVisits />} />
          <Route path="/summaryChart" element={<Summrychart />} />


          {/* Rehabilitation and Education Management */}
          <Route path="/rehabilitationDashboard" element={<RehabilitationDashboard />} />
          <Route path="/allEducation" element={<AllEducations />} />
          <Route path="/educationHome" element={<EducationHome />} />
          <Route path="/allEvents" element={<AllEvents />} />
          <Route path="/allTrainings" element={<AllTrainings />} />
          <Route path="/allReintegrations" element={<AllReintegrations />} />
          <Route path="/upcommongEvents" element={<UpcommingEvents />} />
          <Route path="/pastEvents" element={<PastEvents />} />
          <Route path="/youthEducation" element={<YouthEducation />} />
          <Route path="/adultEducation" element={<AdultEducation />} />
          <Route path="/digitalEducation" element={<DigitalEducation />} />

          {/* security staff management */}
          <Route path="/securityStaffDashboard" element={<SecurityDashboard />} />
          <Route path="/allSecurityStaff" element={<AllSecurityStaff />} />
          <Route path="/allIncidents" element={<AllIncident />} />

          {/*maintenance */}

          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="addTask" element={<AddTask/>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<UpdateTask />} />
          <Route path="/task" element={<Task/>} />

    </Routes>
    </div>
  );
}

export default App;