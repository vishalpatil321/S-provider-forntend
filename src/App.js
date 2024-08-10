import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoutes from './Components/ProtectedRoutes';
import PublicRoute from './Components/PublicRoute';
import { useSelector } from 'react-redux';
import Spinner from './Components/Spinner';
import ApplyServiceP from './Pages/ApplyServiceP';
import Notifications from './Pages/Notifications';
import Users from './Pages/Admin/Users';
import ServiceProviders from './Pages/Admin/ServiceProvider';
import Profile from './Pages/ServiceP.js/Profile';
import BookingPage from './Pages/BookingPage';
import Requests from './Pages/Requests';
import ServicePRequests from './Pages/ServiceP.js/ServicePRequest';

function App(){
  const {loading} = useSelector(state => state.alerts)
    return(
        <>
        <BrowserRouter>
        {
        loading ? 
        (<Spinner/>)
      :
      <Routes>
      <Route path='/' element={
        <ProtectedRoutes>
             <Home/>
        </ProtectedRoutes>
        } />
        <Route path='/apply-service' element={
        <ProtectedRoutes>
             <ApplyServiceP/>
        </ProtectedRoutes>
        } />
        <Route path='/admin/users' element={
        <ProtectedRoutes>
             <Users/>
        </ProtectedRoutes>
        } />
        <Route path='/admin/service-providers' element={
        <ProtectedRoutes>
             <ServiceProviders/>
        </ProtectedRoutes>
        } />
        <Route path='/notifications' element={
        <ProtectedRoutes>
             <Notifications/>
        </ProtectedRoutes>
        } />
        <Route path='/serviceP/profile/:id' element={
        <ProtectedRoutes>
             <Profile/>
        </ProtectedRoutes>
        } />
        <Route path='/serviceP/booking/:servicePId' element={
        <ProtectedRoutes>
             <BookingPage/>
        </ProtectedRoutes>
        } />
        <Route path='/requests' element={
        <ProtectedRoutes>
             <Requests/>
        </ProtectedRoutes>
        } />
        <Route path='/serviceP-requests' element={
        <ProtectedRoutes>
             <ServicePRequests/>
        </ProtectedRoutes>
        } />
      <Route path='/login' element={
        <PublicRoute>
          <Login/>
        </PublicRoute>
        } />
      <Route path='/register' element={
        <PublicRoute>
        <Register/>
        </PublicRoute>
        } />
     </Routes>
      }
        
        </BrowserRouter>
        </>
    );
}

export default App;