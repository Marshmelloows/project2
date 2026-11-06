//-----------------------------//Importing Function//-----------------------------//
import Header from './components/includes/Header';
import Footer from './components/includes/Footer';
import Home from './components/Home';
import AdvancedJS from './components/AdvancedJS';//import AdvancedJS Component
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'; 
import FAQ from './components/FAQ';//import FAQ Component
import Bookings from './components/Bookings';//import Bookings Component

//-----------------------------//function components//-----------------------------//
function App() {
  return (
    <>
      {/* */}
    //commented out BrowserRouter to use HashRouter instead for GitHub Pages deployment
    {/*<BrowserRouter>*/}
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advancedJS" element={<AdvancedJS />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/Bookings" element={<Bookings />} />
        </Routes>
        <Footer />
      </HashRouter>
    {/*</BrowserRouter>/*/}

    </>
  );
}

export default App;
