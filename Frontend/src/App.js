import './App.css';
import AgentPage from './Components/TravelAgent/CreatePackage';
import Feedback from './Components/Feedback';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './Components/LoginRegister/Login';
import ResetPasswordPage from './Components/LoginRegister/ResetPasswordPage';
import Home from './Components/Home';
import AllPackages from './Components/AllPackages';
import IndividualPackage from './Components/IndividualPackage';
import CreatePackage from './Components/TravelAgent/CreatePackage';
import AddSpot from './Components/TravelAgent/AddSpot';
import TripBooking from './Components/Traveller.js/TripBooking';
import TravellerLanding from './Components/Traveller.js/TravellerLanding';
import PackageCard from './Components/Package-Card';
import Profile from './Components/Traveller.js/Profile';
import MyBookings from './Components/Traveller.js/MyBookings';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from './Components/LoginRegister/ForgotPassword';
import Register from './Components/LoginRegister/Register';
import AdminLanding from './Components/Admin/AdminLanding';
import InvoicePage from './Components/InvoicePage';
import ProfileProtected from './Components/Protected/Profile';
import Traveller from './Components/Protected/Traveller';
import TravelAgent from './Components/Protected/TravelAgent';
import FeebackProtected from './Components/Protected/FeedbackProtected';
import AdminProtected from './Components/Protected/AdminProtected';
import Logout from './Components/LoginRegister/Logout';

function App() {
  var token;
  return (
    <div className="App">
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/resetPassword/:email/:emailToken" element={<ResetPasswordPage/>}/>
          <Route path='/addSpot' element={<AddSpot/>}/>

          <Route path='/adminPage' element={
          <AdminProtected token={token}>
            <AdminLanding/>
          </AdminProtected>
          }/>

          <Route path='/createPackage' element={
          <TravelAgent token={token}>
            <CreatePackage/>
          </TravelAgent>
          }/>

          <Route path='/travellerLanding' element={
          // <Traveller token={token}>
            <TravellerLanding/>
          // </Traveller>
          }/>

          <Route path='/tripBooking' element={
          <TripBooking token={token}>
            <TripBooking/>
          </TripBooking>
          }/>

          <Route path='/tripBooking' element={
          <ProfileProtected token={token}>
            <Profile/>
          </ProfileProtected>
          }/>

        <Route path='/feedback' element={
          <FeebackProtected token={token}>
            <Feedback/>
          </FeebackProtected>
          }/>

          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/invoice' element={<InvoicePage/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
        {/* <TravellerLanding/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
