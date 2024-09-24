import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './HomeLayout'; // Import HomeLayout for the homepage
import Childpage from './Childpage'; // Import CategoriesDisplay for category pages
import NavBar from './NavBar'; // NavBar will be visible on all pages
import Footer from './Footer';
function App() {
  return (
    <Router>
      <NavBar /> {/* NavBar will be visible on all pages */}
      <Routes>
        {/* Home route renders HeroSection and CardsTab */}
        <Route path="/" element={<HomeLayout />} /> 
        <Route path="/home" element={<HomeLayout />} /> 
        {/* Childpage route for a specific category */}
        <Route path="/:slug" element={<Childpage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
