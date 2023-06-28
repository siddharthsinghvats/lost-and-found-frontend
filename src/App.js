import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/SignUp';
import Landing from './components/Landing';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Redirect, Navigate } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LostItems from './components/LostItems'
import FoundItems from './components/FoundItems';
import { useState, useContext } from 'react';
import Profile from './components/Profile';
import Loading from './components/Loading';
import OthersProfile from './components/OthersProfile';
import Particles from './components/Particles';


function App() {
const [loading, setLoading] = useState(true);
setTimeout(()=>{
  setLoading(false);
},2000);
  return (

      <div className="App">
   
   {loading?<Loading/>:
        <BrowserRouter>
          <Routes>
            {
           
           localStorage.getItem('user') ? <>
                <Route path='/' element={<Navigate to='/lost'/>} />
                <Route path='/login' element={<Navigate to='/lost'/>} />
                <Route path='/signup' element={<Navigate to='/lost'/>} />
                <Route path='/lost' element={<LostItems />} />
                <Route path='/found' element={<FoundItems />} />
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/user/:id' element={<OthersProfile/>}/>
              </> : <>
                <Route path='/' element={<Landing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/lost' element={< Navigate to= '/login'/>} />
                <Route path='/found' element={< Navigate to= '/login'/>} />
                
              </>
            }
          </Routes>
        </BrowserRouter>
}
      </div>
  );
}

export default App;
