import { Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Machine from './pages/Machine';
import Performance from './pages/Performance';
import Technology from './pages/Technology';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import Configure from './pages/Configure';
import Compare from './pages/Compare';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <div className="grain-overlay" />
      <CustomCursor />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/machine" element={<Machine />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          <Route path="/configure" element={<Configure />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
