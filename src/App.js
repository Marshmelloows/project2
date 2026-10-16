//-----------------------------//Importing Function//-----------------------------//
import Header from './components/includes/Header';
import Footer from './components/includes/Footer';
import Home from './components/Home';
import AdvancedJS from './components/AdvancedJS';//import AdvancedJS Component
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom'; 
import FAQ from './components/FAQ';//import FAQ Component
import Bookings from './components/Bookings';//import Bookings Component

//-----------------------------//function components//-----------------------------//
function App() {
  return (
    <>
      {/* */}

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advancedJS" element={<AdvancedJS />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/Bookings" element={<Bookings />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
