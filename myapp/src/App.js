import { useState } from 'react';
import './App.css';
import LandingPage from './Client/LandingPage';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
       <LandingPage/> 
    </div>
  );
  
}

export default App;
