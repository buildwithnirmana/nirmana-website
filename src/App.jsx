import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Mail, Clock, 
  Menu as MenuIcon, X, ChevronRight, Calendar, Users, 
  Building, Hammer, HardHat, ChevronLeft, ArrowRight, Settings, Plus, Trash2, 
  Image as ImageIcon, Star, Quote, Ruler, Briefcase, Sparkles, CheckCircle2, ArrowUpRight
} from 'lucide-react';

// --- CUSTOM ICONS TO AVOID PACKAGE ERRORS ---
const Instagram = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const Facebook = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const Linkedin = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// --- FIREBASE CONFIGURATION (MERGED FOR SINGLE FILE) ---
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

// REPLACE THESE WITH YOUR ACTUAL KEYS FROM FIREBASE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- ULTRA-PREMIUM PASTEL & WHITE MIX THEME ---
const THEME = {
  colors: {
    bg: '#FDFCFB',      // A very soft, warm pearl white base
    ink: '#1A1C20',     // Deep slate for text
    surface: '#FFFFFF', 
    pastels: {
      sage: '#DFEAE2',  // Richer soft sage
      rose: '#F2E3E3',  // Richer dusty rose
      sky: '#E1EAF2',   // Richer powder blue
      lilac: '#E8E2EE', // Richer soft lilac
      sand: '#F0E8DD',  // Richer warm sand
    }
  }
};

const INITIAL_DATA = {
  assets: {
    logo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=200', 
    heroBg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2874',
    philosophyImg: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000',
    aboutImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000',
    accent1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
  },
  contact: {
    address: '1200 Industrial Pkwy, Ste 400, Metro City',
    phone: '+1 (555) 123-4567',
    email: 'contact@nirmana.com',
    hours1: 'Mon - Fri: 7:00 AM - 6:00 PM',
    hours2: 'Sat: 8:00 AM - 2:00 PM',
    mapUrl: 'https://www.google.com/maps?q=New+York+City+Construction&output=embed'
  },
  projects: [
    { id: 1, category: 'Commercial', name: 'Apex Tower', desc: 'A 40-story commercial office building featuring sustainable design and glass facades.', location: 'Downtown Metro', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200', isFeatured: true, showOnHome: true, color: 'sage' },
    { id: 2, category: 'Residential', name: 'Oakwood Estates', desc: 'Luxury residential development comprising 150 single-family homes with premium amenities.', location: 'Westside Suburbs', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200', isFeatured: false, showOnHome: true, color: 'rose' },
    { id: 3, category: 'Infrastructure', name: 'River Bridge', desc: 'Structural engineering of a 4-lane suspension bridge connecting municipal districts.', location: 'County Highway 9', img: 'https://images.unsplash.com/photo-1513828742140-ccaa15f19be5?auto=format&fit=crop&q=80&w=1200', isFeatured: false, showOnHome: false, color: 'sky' },
    { id: 4, category: 'Commercial', name: 'TechHub Center', desc: 'Modern mixed-use space combining retail and tech incubator offices with LEED certification.', location: 'Silicon District', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', isFeatured: true, showOnHome: true, color: 'lilac' },
  ],
  gallery: [
    { id: 1, src: "https://images.unsplash.com/photo-1541888086225-f674ce88ec54?auto=format&fit=crop&q=80&w=1000", category: 'Sites', showOnHome: true },
    { id: 2, src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000", category: 'Completed', showOnHome: false },
    { id: 3, src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000", category: 'Team', showOnHome: true },
    { id: 4, src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000", category: 'Completed', showOnHome: true },
  ],
  reviews: [
    { id: 1, author: "Sarah Jenkins", role: "CEO, Meridian Group", rating: 5, text: "Nirmana delivered our corporate headquarters ahead of schedule. Their attention to detail and architectural sensitivity is unparalleled in this region.", date: "2 months ago", source: "Client Feedback" },
    { id: 2, author: "Marcus Thorne", role: "City Planner", rating: 5, text: "Working with them on the municipal bridge project was a seamless experience. True professionals who understand complex infrastructural demands.", date: "4 months ago", source: "Google Reviews" },
    { id: 3, author: "Elena Rodriguez", role: "Homeowner", rating: 4, text: "Our custom home build was a massive undertaking, but the team guided us gracefully through every step. The craftsmanship is breathtaking.", date: "6 months ago", source: "Houzz" }
  ],
  consultations: [],
  messages: []
};

export default function App() {
  const [siteData, setSiteData] = useState(INITIAL_DATA);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Admin States
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // --- 1. FIREBASE REAL-TIME SYNC ---
  useEffect(() => {
    // We store all website data in a single document called "websiteData"
    const docRef = doc(db, "nirmana", "websiteData");
    
    // onSnapshot automatically updates the website the second data changes in Firebase!
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setSiteData(docSnap.data());
      } else {
        // First time setup: push initial data to the blank database
        setDoc(docRef, INITIAL_DATA);
        setSiteData(INITIAL_DATA);
      }
    });

    return () => unsubscribe();
  }, []);

  // --- 2. FIREBASE SAVE FUNCTION ---
  const syncData = async (updater) => {
    let newData;
    if (typeof updater === 'function') {
      newData = updater(siteData);
    } else {
      newData = updater;
    }
    
    setSiteData(newData); // Optimistic fast UI update

    try {
      await setDoc(doc(db, "nirmana", "websiteData"), newData);
    } catch (error) {
      console.error("Firebase Error:", error);
      showToast("Failed to save to Cloud.", "error");
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 4000);
  };

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-[#1A1C20] selection:text-white overflow-x-hidden relative w-full" style={{ backgroundColor: THEME.colors.bg, color: THEME.colors.ink }}>
      
      {/* Ambient Premium Pastel Background Mix */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-white/20 via-transparent to-white/20">
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[120px] opacity-80 animate-pulse" style={{ backgroundColor: THEME.colors.pastels.sky, animationDuration: '10s' }}></div>
         <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full filter blur-[120px] opacity-70 animate-pulse" style={{ backgroundColor: THEME.colors.pastels.rose, animationDuration: '12s' }}></div>
         <div className="absolute bottom-[-15%] left-[15%] w-[60vw] h-[60vw] rounded-full filter blur-[130px] opacity-80 animate-pulse" style={{ backgroundColor: THEME.colors.pastels.sage, animationDuration: '15s' }}></div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-700 ease-out ${toast.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-12 scale-95 pointer-events-none'}`}>
        <div className={`px-8 py-5 rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.08)] font-medium text-sm flex items-center gap-4 backdrop-blur-2xl border ${toast.type === 'error' ? 'bg-red-50/95 text-red-700 border-red-100' : 'bg-white/95 text-[#1A1C20] border-white/60'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} className="text-[#8BA59B]" /> : <X size={20} className="text-red-500" />}
          {toast.message}
        </div>
      </div>

      {/* Floating Glass Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-1000 flex justify-center ${isScrolled || currentPage !== 'home' ? 'top-6 px-4' : 'top-6 md:top-10 px-6 md:px-12'}`}>
        <div className={`flex items-center justify-between transition-all duration-1000 ${isScrolled || currentPage !== 'home' ? 'w-full max-w-4xl bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 px-6 py-4 rounded-[3rem]' : 'w-full max-w-7xl px-0 py-2 bg-white/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 rounded-3xl md:p-0'}`}>
          
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className={`flex items-center justify-center rounded-full transition-all duration-700 ${isScrolled || currentPage !== 'home' ? 'h-12 w-12 bg-[#1A1C20]' : 'h-14 w-14 bg-white shadow-[0_8px_20px_rgb(0,0,0,0.04)]'}`}>
              <Building size={isScrolled || currentPage !== 'home' ? 20 : 24} className={isScrolled || currentPage !== 'home' ? 'text-white' : 'text-[#1A1C20]'} />
            </div>
            <div className={`text-2xl font-bold tracking-tight hidden sm:block font-serif ${isScrolled || currentPage !== 'home' ? 'text-[#1A1C20]' : 'text-[#1A1C20]'}`}>
              Nirmana.
            </div>
          </div>
          
          {/* Main Links */}
          <div className={`hidden md:flex items-center space-x-2 ${isScrolled || currentPage !== 'home' ? '' : 'bg-white/70 backdrop-blur-xl px-8 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/60'}`}>
            {['home', 'projects', 'about', 'gallery'].map((page) => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className={`px-6 py-2.5 rounded-full capitalize text-xs tracking-[0.15em] font-bold transition-all duration-500 relative group ${currentPage === page ? 'bg-[#1A1C20] text-white shadow-md' : 'text-gray-500 hover:text-[#1A1C20] hover:bg-white/60'}`}
              >
                {page}
              </button>
            ))}
          </div>

          <div className="md:hidden flex justify-end">
            <button className="p-4 rounded-full bg-white/90 backdrop-blur-md text-[#1A1C20] shadow-[0_8px_20px_rgb(0,0,0,0.04)] border border-white/60" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#FDFCFB]/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-10 animate-fadeIn">
          {['home', 'projects', 'about', 'gallery'].map((page) => (
            <button key={page} onClick={() => navigateTo(page)} className={`text-5xl capitalize font-serif transition-colors ${currentPage === page ? 'text-[#1A1C20] italic' : 'text-gray-400 hover:text-[#1A1C20]'}`}>
              {page}
            </button>
          ))}
          <button onClick={() => { setIsConsultationOpen(true); setIsMobileMenuOpen(false); }} className="mt-12 px-12 py-5 rounded-full text-white font-bold text-xs uppercase tracking-[0.2em] shadow-2xl bg-[#1A1C20] hover:scale-105 transition-transform duration-500">
            Start a Project
          </button>
        </div>
      )}

      {/* Consultation Modal */}
      {isConsultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1C20]/30 backdrop-blur-xl animate-fadeIn overflow-y-auto">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[4rem] w-full max-w-2xl shadow-[0_40px_80px_rgb(0,0,0,0.1)] relative border border-white p-3 my-8">
            <div className="bg-gradient-to-br from-[#FDFCFB] to-[#F7F4EF]/50 rounded-[3.5rem] p-8 md:p-16 relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-60 pointer-events-none" style={{ backgroundColor: THEME.colors.pastels.sky }}></div>
               
               <button onClick={() => setIsConsultationOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-[#1A1C20] transition-colors z-10 bg-white p-4 rounded-full shadow-[0_8px_20px_rgb(0,0,0,0.04)] border border-gray-50"><X size={20} /></button>
               
               <div className="mb-10 md:mb-12 relative z-10">
                 <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4 block">Consultation</span>
                 <h2 className="text-4xl md:text-5xl font-serif text-[#1A1C20] leading-[1.1] tracking-tight">Bring your <br/><span className="italic">vision to life.</span></h2>
               </div>

               <form className="space-y-4 md:space-y-5 relative z-10" onSubmit={(e) => { 
                 e.preventDefault(); 
                 const fd = new FormData(e.target);
                 const newConsult = { id: Date.now(), date: fd.get('date'), projectType: fd.get('type'), name: fd.get('name'), phone: fd.get('phone'), status: 'Pending' };
                 setSiteData(prev => ({ ...prev, consultations: [newConsult, ...(prev.consultations || [])] }));
                 showToast("Request Received! Our architects will contact you shortly."); 
                 setIsConsultationOpen(false); 
               }}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                   <input type="text" name="name" placeholder="Full Name" className="w-full px-6 py-5 bg-white border-none rounded-[2rem] focus:ring-2 focus:ring-[#1A1C20]/10 text-sm font-medium shadow-[0_4px_15px_rgb(0,0,0,0.02)]" required />
                   <input type="tel" name="phone" placeholder="Phone Number" className="w-full px-6 py-5 bg-white border-none rounded-[2rem] focus:ring-2 focus:ring-[#1A1C20]/10 text-sm font-medium shadow-[0_4px_15px_rgb(0,0,0,0.02)]" required />
                 </div>
                 
                 <div className="relative">
                   <Building className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                   <select name="type" className="w-full pl-16 pr-6 py-5 bg-white border-none rounded-[2rem] focus:ring-2 focus:ring-[#1A1C20]/10 text-sm font-medium text-gray-600 appearance-none shadow-[0_4px_15px_rgb(0,0,0,0.02)] cursor-pointer" required>
                     <option value="">Select Project Scope</option>
                     <option value="Commercial">Commercial Architecture</option>
                     <option value="Residential">Premium Residential</option>
                     <option value="Renovation">Historical Renovation</option>
                     <option value="Infrastructure">Infrastructure</option>
                   </select>
                 </div>

                 <div className="relative">
                   <Calendar className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                   <input type="date" name="date" className="w-full pl-16 pr-6 py-5 bg-white border-none rounded-[2rem] focus:ring-2 focus:ring-[#1A1C20]/10 text-sm font-medium text-gray-600 shadow-[0_4px_15px_rgb(0,0,0,0.02)]" required />
                 </div>

                 <button type="submit" className="w-full py-6 bg-[#1A1C20] text-white uppercase tracking-[0.2em] text-xs font-bold rounded-[2rem] hover:bg-gray-800 transition-all duration-500 mt-4 shadow-[0_15px_30px_rgb(26,28,32,0.2)] hover:-translate-y-1">Submit Request</button>
               </form>
            </div>
          </div>
        </div>
      )}

      {/* Secret Admin Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1C20]/30 backdrop-blur-xl animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] w-full max-w-sm shadow-[0_40px_80px_rgb(0,0,0,0.1)] relative p-2 border border-white">
            <div className="bg-gradient-to-br from-[#FDFCFB] to-[#F0EBF4]/40 p-12 rounded-[2.5rem] relative">
              <button onClick={() => { setShowLogin(false); setLoginError(''); setPassword(''); }} className="absolute top-6 right-6 text-gray-400 hover:text-[#1A1C20] transition-colors bg-white p-3 rounded-full shadow-[0_4px_15px_rgb(0,0,0,0.04)]"><X size={18} /></button>
              <div className="flex justify-center mb-10">
                <div className="bg-[#1A1C20] p-5 rounded-full text-white shadow-xl"><Settings size={26} /></div>
              </div>
              <h2 className="text-3xl font-serif mb-8 text-center text-[#1A1C20] tracking-tight">Admin Access</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (password === 'admin123') { setIsAdmin(true); setShowLogin(false); setPassword(''); setLoginError(''); navigateTo('admin'); showToast("System Unlocked"); } 
                else { setLoginError('Incorrect access code.'); }
              }} className="space-y-5">
                <input type="password" placeholder="Enter Passcode" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-5 border-none rounded-[2rem] bg-white shadow-[0_4px_15px_rgb(0,0,0,0.02)] focus:ring-2 focus:ring-[#1A1C20]/10 text-sm font-medium text-center tracking-[0.3em]" autoFocus />
                {loginError && <p className="text-red-500 text-xs text-center font-bold bg-red-50/80 py-3 rounded-2xl">{loginError}</p>}
                <button type="submit" className="w-full py-5 bg-[#1A1C20] text-white uppercase tracking-[0.2em] text-xs font-bold rounded-[2rem] hover:bg-gray-800 shadow-[0_15px_30px_rgb(26,28,32,0.2)] transition-transform duration-500 hover:-translate-y-1">Unlock</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Render */}
      <main className="min-h-screen relative z-10 w-full overflow-hidden">
        {currentPage === 'home' && <Home navigateTo={navigateTo} openConsultation={() => setIsConsultationOpen(true)} data={siteData} updateData={syncData} showToast={showToast} />}
        {currentPage === 'projects' && <Projects data={siteData} />}
        {currentPage === 'about' && <About data={siteData} />}
        {currentPage === 'gallery' && <Gallery data={siteData} />}
        {currentPage === 'admin' && isAdmin && <AdminDashboard data={siteData} updateData={syncData} logout={() => { setIsAdmin(false); navigateTo('home'); showToast("Logged out securely"); }} showToast={showToast} />}
      </main>

      {/* Footer */}
      {currentPage !== 'admin' && (
        <footer className="relative z-10 mt-32 pt-32 pb-16 px-6 md:px-12 bg-[#1A1C20] text-white rounded-t-[4rem] overflow-hidden">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20 lg:gap-16 items-start relative z-10">
            
            <div className="md:col-span-4 flex flex-col items-start space-y-10">
                <div className="cursor-pointer group flex items-center space-x-4" onClick={() => setShowLogin(true)} title="Admin Access">
                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-full border border-white/5 group-hover:bg-white/20 transition-all duration-500">
                    <Building size={26} className="text-white" />
                  </div>
                  <span className="text-3xl font-serif font-bold tracking-tight">Nirmana.</span>
                </div>
                <p className="text-gray-400 leading-loose text-sm max-w-sm font-light">
                  Engineering excellence and crafting the skyline. We are your trusted architectural partner in premium commercial and residential construction.
                </p>
                <div className="flex space-x-4 pt-2">
                  <a href="#" className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-white transition-all duration-300"><Linkedin size={18} /></a>
                  <a href="#" className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-white transition-all duration-300"><Facebook size={18} /></a>
                  <a href="#" className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-white transition-all duration-300"><Instagram size={18} /></a>
                </div>
            </div>
            
            <div className="md:col-span-3 space-y-8">
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-10">Headquarters</h4>
              <ul className="space-y-6 text-sm text-gray-300 font-light">
                <li className="flex items-start gap-5"><MapPin size={20} className="text-gray-500 mt-0.5 flex-shrink-0"/> <span className="leading-relaxed whitespace-normal break-words">{siteData.contact.address}</span></li>
                <li className="flex items-center gap-5"><Phone size={20} className="text-gray-500"/> <span>{siteData.contact.phone}</span></li>
                <li className="flex items-center gap-5"><Mail size={20} className="text-gray-500"/> <span className="break-all">{siteData.contact.email}</span></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-8">
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-10">Operations</h4>
              <ul className="space-y-6 text-sm text-gray-300 font-light">
                <li className="flex items-start gap-5"><Clock size={20} className="text-gray-500 mt-0.5 flex-shrink-0"/> <span>{siteData.contact.hours1}</span></li>
                <li className="flex items-start gap-5"><HardHat size={20} className="text-gray-500 mt-0.5 flex-shrink-0"/> <span>{siteData.contact.hours2}</span></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-8">
               <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-10">Menu</h4>
               <ul className="space-y-6 text-sm text-gray-300 flex flex-col items-start font-light">
                 {['home', 'projects', 'about', 'gallery'].map(link => (
                    <button key={link} onClick={() => navigateTo(link)} className="capitalize hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-3 group">
                      <span className="w-4 h-[1px] bg-gray-600 group-hover:bg-white transition-colors duration-300"></span> {link}
                    </button>
                 ))}
               </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/10 text-[10px] text-gray-500 flex flex-col md:flex-row justify-between items-center gap-6 uppercase tracking-[0.2em] font-bold">
            <p>&copy; {new Date().getFullYear()} Nirmana Solutions.</p>
            <p>Licensed, Bonded & Insured.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

// --- STREAMING_CHUNK:Defining Home Component... ---
function Home({ navigateTo, openConsultation, data, updateData, showToast }) {
  // Removed .slice(0, 3) to show all selected projects without cutting off
  const featuredProjects = data.projects.filter(item => item.showOnHome);
  const homeGalleryImages = data.gallery.filter(item => item.showOnHome).slice(0, 4);

  return (
    <div className="animate-fadeIn w-full overflow-hidden">
      
      {/* Editorial Hero Section with Updated Padding for NavBar Clearance */}
      <div className="relative min-h-screen flex items-center justify-center pt-48 md:pt-56 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full mt-16 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center w-full">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            <div className="inline-block px-5 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-8 md:mb-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
              Premium Architecture & Construction
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-[#1A1C20] mb-8 md:mb-10 leading-[1.05] tracking-tighter">
              Crafting <br/>
              <span className="font-serif italic font-light text-gray-500">Spaces.</span> <br/>
              Elevating <span className="font-serif italic font-light text-[#8BA59B]">Life.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 md:mb-14 max-w-lg leading-relaxed font-light">
              We deliver complex commercial and residential projects with uncompromising quality, precision engineering, and elegant design.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
              <button onClick={openConsultation} className="px-8 md:px-10 py-4 md:py-5 bg-[#1A1C20] text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs w-full sm:w-auto rounded-full shadow-[0_15px_40px_rgb(26,28,32,0.25)] hover:bg-gray-800 transition-all duration-500 hover:-translate-y-1">Start a Project</button>
              <button onClick={() => navigateTo('projects')} className="px-8 md:px-10 py-4 md:py-5 bg-transparent text-[#1A1C20] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs w-full sm:w-auto rounded-full hover:bg-white/60 backdrop-blur-sm transition-all duration-500 flex items-center justify-center gap-3 group shadow-sm border border-transparent hover:border-white/50">
                Portfolio <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
              </button>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative h-[450px] md:h-[650px] hidden lg:block mt-12 lg:mt-0">
            {/* Main Image */}
            <div className="absolute right-0 top-12 w-[85%] h-[85%] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.08)] z-20">
               <img src={data.assets.heroBg} alt="Architecture" className="w-full h-full object-cover scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent mix-blend-overlay"></div>
            </div>
            {/* Secondary Floating Image */}
            <div className="absolute left-0 bottom-0 w-[50%] h-[55%] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_20px_40px_rgb(0,0,0,0.12)] z-30 border-[6px] md:border-[10px] border-[#FDFCFB]">
               <img src={data.assets.accent1} alt="Detail" className="w-full h-full object-cover" />
            </div>
            {/* Decorative Element */}
            <div className="absolute top-0 right-1/4 w-24 h-24 md:w-36 md:h-36 rounded-full border border-gray-200 z-10 flex items-center justify-center backdrop-blur-sm">
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 rotate-12">Est. 2001</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Approach Section */}
      <div className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <div className="bg-gradient-to-br from-[#DFEAE2]/90 to-white/95 backdrop-blur-3xl rounded-[4rem] md:rounded-[5rem] p-10 md:p-24 shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-white grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <div className="space-y-10 md:space-y-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1A1C20] leading-[1.1] tracking-tight">Engineered for <br/><span className="font-serif italic font-light text-gray-500">Excellence.</span></h2>
            <div className="w-20 h-[2px] bg-[#1A1C20]/10"></div>
            <p className="leading-relaxed text-lg md:text-xl text-gray-600 font-light">
              We approach every site as a blank canvas. By blending sustainable practices with cutting-edge technology and decades of refined expertise, we create environments that stand the test of time.
            </p>
            <div className="space-y-8 pt-6">
              <div className="flex items-start gap-6 md:gap-8 group">
                <div className="p-4 md:p-5 bg-white rounded-[1.5rem] md:rounded-[2rem] text-gray-700 shadow-[0_8px_20px_rgb(0,0,0,0.03)] border border-gray-50 group-hover:scale-110 transition-transform duration-500"><HardHat size={28}/></div> 
                <div>
                  <h4 className="font-bold text-[#1A1C20] text-lg mb-2">Uncompromising Safety</h4>
                  <p className="text-gray-500 font-light leading-relaxed">Rigorous standards at every site level, ensuring protection and precision.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 md:gap-8 group">
                <div className="p-4 md:p-5 bg-white rounded-[1.5rem] md:rounded-[2rem] text-gray-700 shadow-[0_8px_20px_rgb(0,0,0,0.03)] border border-gray-50 group-hover:scale-110 transition-transform duration-500"><Clock size={28}/></div> 
                <div>
                  <h4 className="font-bold text-[#1A1C20] text-lg mb-2">Precision Timelines</h4>
                  <p className="text-gray-500 font-light leading-relaxed">Delivering complex phases exactly on schedule, honoring our commitments.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E1EAF2] to-white rounded-[3rem] md:rounded-[4rem] transform rotate-3 scale-105 opacity-70"></div>
            <img src={data.assets.philosophyImg} alt="Planning" className="relative w-full h-[400px] md:h-[650px] object-cover rounded-[3rem] md:rounded-[4rem] shadow-xl" />
          </div>
        </div>
      </div>

      {/* Featured Portfolio Section */}
      <div className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 space-y-8 md:space-y-0">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-6 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1A1C20] tracking-tight">Featured <span className="font-serif italic font-light text-gray-500">Works.</span></h2>
          </div>
          <button onClick={() => navigateTo('projects')} className="group pb-3 border-b-2 border-[#1A1C20]/10 hover:border-[#1A1C20] flex items-center space-x-4 transition-colors text-[#1A1C20] font-bold text-xs uppercase tracking-[0.2em]">
            <span>View All Projects</span><ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {featuredProjects.map((item, index) => {
            const bgColors = { sage: '#DFEAE2', rose: '#F2E3E3', sky: '#E1EAF2', lilac: '#E8E2EE', sand: '#F0E8DD' };
            const itemBg = bgColors[item.color] || '#F0E8DD';

            return (
              <div key={index} onClick={() => navigateTo('projects')} className="cursor-pointer group flex flex-col relative h-[450px] md:h-[550px] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-sm hover:shadow-[0_30px_60px_rgb(0,0,0,0.06)] transition-all duration-700 hover:-translate-y-3">
                <div className="absolute inset-0 transition-opacity duration-700 opacity-90" style={{ backgroundColor: itemBg }}></div>
                
                {/* Image and Top-Left Tag Layer */}
                <div className="absolute inset-3 bottom-[35%] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-5 left-5 md:top-6 md:left-6 z-20">
                    <span className="bg-white/95 backdrop-blur-md text-[#1A1C20] px-4 md:px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm border border-gray-100">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Text Block Layer without truncation */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 h-auto min-h-[35%] flex flex-col justify-end bg-gradient-to-t from-white/90 via-white/50 to-transparent backdrop-blur-[2px] z-10">
                   <div className="bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-700">
                     <div className="flex flex-col mb-4 gap-2">
                       <h4 className="text-xl md:text-2xl font-bold text-[#1A1C20] whitespace-normal break-words">{item.name}</h4>
                     </div>
                     <p className="text-xs md:text-sm text-gray-500 font-medium flex items-start gap-2">
                       <MapPin size={16} className="flex-shrink-0 mt-0.5"/> 
                       <span className="whitespace-normal break-words">{item.location}</span>
                     </p>
                   </div>
                </div>
              </div>
            );
          })}
          {featuredProjects.length === 0 && <div className="col-span-full text-center text-gray-400 font-medium py-32 border border-dashed border-gray-200 rounded-[4rem]">No featured projects found.</div>}
        </div>
      </div>

      {/* Gallery & Reviews Section */}
      <div className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20 items-center">
          {/* Gallery Teaser */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-10 md:space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#1A1C20] mb-6 tracking-tight">On <span className="font-serif italic font-light text-gray-500">Site.</span></h2>
              <p className="text-gray-500 font-light text-lg md:text-xl leading-relaxed">A visual journey through our active and completed developments.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {homeGalleryImages.map((img, i) => (
                <div key={i} className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden h-36 md:h-48 group cursor-pointer shadow-sm border border-gray-100" onClick={() => navigateTo('gallery')}>
                  <img src={img.src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Jobsite" />
                  <div className="absolute inset-0 bg-[#1A1C20]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white/90 p-3 rounded-full"><Plus className="text-[#1A1C20]" size={20} /></div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigateTo('gallery')} className="self-start text-xs font-bold uppercase tracking-[0.2em] text-[#1A1C20] hover:text-gray-500 transition-colors flex items-center gap-3 group">
              Open Full Gallery <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Testimonials */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#E8E2EE]/90 to-white/95 backdrop-blur-2xl rounded-[4rem] md:rounded-[5rem] p-10 md:p-20 shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-white">
             <Quote className="text-[#1A1C20]/10 mb-8 md:mb-10" size={56} />
             <div className="space-y-12 md:space-y-16">
               {(data.reviews || []).slice(0,2).map((review, idx) => (
                 <div key={idx} className="relative">
                   <p className="text-xl md:text-3xl text-gray-700 font-serif font-light leading-relaxed mb-6 md:mb-8">"{review.text}"</p>
                   <div className="flex items-center gap-4 md:gap-5">
                     <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-gray-600 font-bold border border-gray-100 shadow-sm text-lg">
                        {review.author.charAt(0)}
                     </div>
                     <div>
                       <h4 className="font-bold text-[#1A1C20] text-sm md:text-base mb-1">{review.author}</h4>
                       <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{review.role} • {review.source}</p>
                     </div>
                   </div>
                   {idx === 0 && <div className="h-[1px] w-full bg-gradient-to-r from-gray-200 to-transparent my-10 md:my-12"></div>}
                 </div>
               ))}
               {(!data.reviews || data.reviews.length === 0) && <p className="text-gray-400 italic">No reviews available.</p>}
             </div>
          </div>
        </div>
      </div>
      
      <ContactSection data={data} updateData={updateData} showToast={showToast} />
    </div>
  );
}

// --- STREAMING_CHUNK:Defining Projects Component... ---
function Projects({ data }) {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', ...Array.from(new Set(data.projects.map(item => item.category)))];
  const displayedItems = activeTab === 'All' ? data.projects : data.projects.filter(c => c.category === activeTab);

  return (
    <div className="pt-48 md:pt-56 pb-40 px-6 md:px-12 max-w-7xl mx-auto animate-fadeIn min-h-screen relative z-10 w-full">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-bl from-[#EAF0EB]/60 to-transparent rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="text-center mb-20 md:mb-24 max-w-4xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-6 block">Our Legacy</span>
        <h1 className="text-5xl md:text-8xl text-[#1A1C20] mb-8 md:mb-10 tracking-tighter">Project <span className="font-serif italic font-light text-gray-500">Portfolio.</span></h1>
        <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">Explore our diverse range of structural masterpieces, from towering commercial centers to premium residential estates.</p>
      </div>

      <div className="flex justify-center mb-16 md:mb-20">
        <div className="flex flex-wrap justify-center gap-2 bg-white/70 backdrop-blur-xl p-3 rounded-[3rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
          {tabs.map((tab, index) => (
            <button key={index} onClick={() => setActiveTab(tab)} className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${activeTab === tab ? 'bg-[#1A1C20] text-white shadow-lg' : 'text-gray-500 hover:text-[#1A1C20] hover:bg-white border border-transparent'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 animate-fadeIn">
        {displayedItems.map((item, idx) => (
          <div key={idx} className="flex flex-col bg-white/80 backdrop-blur-2xl rounded-[3rem] md:rounded-[4rem] overflow-hidden transition-all duration-700 shadow-[0_10px_40px_rgb(0,0,0,0.03)] border border-white hover:-translate-y-3 hover:shadow-[0_20px_60px_rgb(0,0,0,0.06)] group">
            <div className="relative h-[350px] md:h-[450px] overflow-hidden p-3 md:p-4">
               <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-[2.5rem] md:rounded-[3.5rem] group-hover:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[3.5rem]"></div>
               
               {/* Category Tag Moved to Top Left */}
               <div className="absolute top-8 left-8 md:top-10 md:left-10 z-20">
                 <span className="bg-white/95 text-[#1A1C20] backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl border border-gray-100">
                   {item.category}
                 </span>
               </div>

               {/* Featured Tag (If applicable) remains Top Right */}
               {item.isFeatured && <div className="absolute top-8 right-8 md:top-10 md:right-10 z-20"><span className="bg-[#1A1C20]/95 text-white backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm"><Star size={12} className="text-white"/> Featured</span></div>}
            </div>
            <div className="p-8 md:p-12 flex-1 flex flex-col">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1A1C20] mb-4 md:mb-5 tracking-tight whitespace-normal break-words">{item.name}</h3>
              <div className="flex items-center gap-3 text-gray-500 text-xs md:text-sm font-medium mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-100">
                <MapPin size={18} className="flex-shrink-0" /> <span className="whitespace-normal break-words">{item.location}</span>
              </div>
              <p className="text-gray-600 font-light leading-relaxed flex-1 text-base md:text-lg whitespace-normal break-words">{item.desc}</p>
            </div>
          </div>
        ))}
        {displayedItems.length === 0 && <div className="col-span-full py-32 text-center bg-white/60 border border-dashed border-gray-200 rounded-[4rem] text-gray-500 text-lg">No projects found in this category.</div>}
      </div>
    </div>
  );
}

// --- STREAMING_CHUNK:Defining About Component... ---
function About({ data }) {
  return (
    <div className="pt-48 md:pt-56 pb-40 animate-fadeIn min-h-screen relative z-10 w-full">
      <div className="absolute top-1/4 left-0 w-[50vw] h-[50vw] bg-gradient-to-tr from-[#F2E3E3]/80 to-transparent rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24 md:mb-32 max-w-4xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-6 block">Company Profile</span>
          <h1 className="text-5xl md:text-8xl text-[#1A1C20] tracking-tighter">About <span className="font-serif italic font-light text-gray-500">Nirmana.</span></h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center bg-white/80 backdrop-blur-2xl p-8 md:p-20 rounded-[4rem] md:rounded-[5rem] shadow-[0_10px_50px_rgb(0,0,0,0.03)] border border-white">
          <div className="relative">
             <img src={data.assets.aboutImg} alt="Construction Team" className="relative w-full h-[400px] md:h-[700px] object-cover rounded-[3rem] md:rounded-[4rem] shadow-[0_20px_50px_rgb(0,0,0,0.08)]" />
             <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 bg-white/80 backdrop-blur-md p-4 md:p-5 rounded-full shadow-2xl hidden md:block border border-white">
                <img src={data.assets.logo} alt="Company Badge" className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-full" />
             </div>
          </div>
          <div className="space-y-10 md:space-y-12 lg:pl-10">
            <h2 className="text-4xl md:text-5xl text-[#1A1C20] leading-[1.1] tracking-tight">Foundations for a <br/><span className="font-serif italic font-light text-gray-500">Better Tomorrow.</span></h2>
            <div className="w-20 h-[2px] bg-[#1A1C20]/10"></div>
            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-gray-600 font-light leading-relaxed">
              <p>Founded over two decades ago, Nirmana started with a single commitment: to honest, architectural brilliance. Today, we are a premier construction firm defining the modern metropolitan skyline.</p>
              <p>Our growth is driven by unwavering integrity, a relentless focus on site safety, and a dedication to timeless quality. We partner with elite architects to ensure every beam reflects rigorous standards and aesthetic grace.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 md:gap-8 pt-10 md:pt-12 border-t border-gray-100">
               <div className="bg-gradient-to-br from-[#E1EAF2]/90 to-white/90 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] text-center border border-white shadow-sm">
                 <h4 className="text-4xl md:text-5xl font-bold text-[#1A1C20] mb-3 tracking-tight">500+</h4>
                 <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Structures Built</p>
               </div>
               <div className="bg-gradient-to-br from-[#DFEAE2]/90 to-white/90 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] text-center border border-white shadow-sm">
                 <h4 className="text-4xl md:text-5xl font-bold text-[#1A1C20] mb-3 tracking-tight">100%</h4>
                 <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Safety Record</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- STREAMING_CHUNK:Defining Gallery Component... ---
function Gallery({ data }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);
  const categories = ['All', ...Array.from(new Set(data.gallery.map(img => img.category)))];
  const filteredImages = activeTab === 'All' ? data.gallery : data.gallery.filter(img => img.category === activeTab);

  const openLightbox = (index) => setSelectedImgIndex(index);
  const closeLightbox = () => setSelectedImgIndex(null);
  const showNext = (e) => { e.stopPropagation(); setSelectedImgIndex((prev) => (prev + 1) % filteredImages.length); };
  const showPrev = (e) => { e.stopPropagation(); setSelectedImgIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length); };

  return (
    <div className="pt-48 md:pt-56 pb-40 px-6 md:px-12 max-w-7xl mx-auto animate-fadeIn min-h-screen relative z-10 w-full">
      <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] bg-gradient-to-tr from-[#E8E2EE]/80 to-transparent rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="text-center mb-20 md:mb-24 max-w-4xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-6 block">Visual Archive</span>
        <h1 className="text-5xl md:text-8xl text-[#1A1C20] tracking-tighter">Jobsite <span className="font-serif italic font-light text-gray-500">Gallery.</span></h1>
      </div>
      
      <div className="flex justify-center mb-16 md:mb-20">
        <div className="flex flex-wrap justify-center gap-2 bg-white/70 backdrop-blur-xl p-3 rounded-[3rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
          {categories.map((cat) => (
             <button key={cat} onClick={() => setActiveTab(cat)} className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === cat ? 'bg-[#1A1C20] text-white shadow-lg' : 'bg-transparent text-gray-500 hover:text-[#1A1C20] hover:bg-white border border-transparent'}`}>
               {cat}
             </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredImages.map((item, index) => (
          <div key={index} onClick={() => openLightbox(index)} className="group relative overflow-hidden h-[300px] md:h-[450px] bg-white/80 p-2 md:p-3 cursor-pointer rounded-[3rem] md:rounded-[4rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-700 border border-white hover:-translate-y-2">
            <img src={item.src} alt={`${item.category} ${index + 1}`} className="w-full h-full object-cover rounded-[2.5rem] md:rounded-[3.5rem] transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-3 rounded-[2.5rem] md:rounded-[3.5rem] bg-[#1A1C20]/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
               <span className="bg-white/95 text-[#1A1C20] px-6 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px] flex items-center gap-3 shadow-xl transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700"><Plus size={18} /> Expand</span>
            </div>
            <div className="absolute top-8 left-8 md:top-10 md:left-10"><span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-white/95 backdrop-blur text-[#1A1C20] px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-sm">{item.category}</span></div>
          </div>
        ))}
        {filteredImages.length === 0 && <div className="col-span-full py-32 text-center bg-white/60 border border-dashed border-gray-200 rounded-[4rem] text-gray-500 text-lg">No images in this category.</div>}
      </div>

      {/* Lightbox Modal */}
      {selectedImgIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-[#FDFCFB]/95 flex items-center justify-center animate-fadeIn backdrop-blur-2xl" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 md:top-10 md:right-10 text-gray-400 hover:text-[#1A1C20] transition-colors bg-white hover:bg-gray-50 p-4 md:p-5 rounded-full shadow-sm border border-gray-100 z-50"><X size={24} /></button>
          <button className="absolute left-6 md:left-12 text-gray-400 hover:text-[#1A1C20] transition-all bg-white hover:bg-gray-50 p-6 rounded-full hidden sm:block shadow-sm border border-gray-100 hover:-translate-x-1 z-50" onClick={showPrev}><ChevronLeft size={28} /></button>
          <div className="relative max-w-7xl max-h-[85vh] w-full px-4 md:px-24 flex justify-center" onClick={(e) => e.stopPropagation()}>
             <img src={filteredImages[selectedImgIndex].src} alt="Fullscreen view" className="max-w-full max-h-[85vh] object-contain rounded-[2rem] md:rounded-[3rem] shadow-2xl animate-fadeIn border-[4px] md:border-[8px] border-white" />
             <div className="absolute inset-0 flex items-center justify-between px-2 sm:hidden pointer-events-none">
                <button onClick={showPrev} className="bg-white/90 backdrop-blur-md p-3 rounded-full text-[#1A1C20] pointer-events-auto shadow-lg"><ChevronLeft size={20}/></button>
                <button onClick={showNext} className="bg-white/90 backdrop-blur-md p-3 rounded-full text-[#1A1C20] pointer-events-auto shadow-lg"><ChevronRight size={20}/></button>
             </div>
          </div>
          <button className="absolute right-6 md:right-12 text-gray-400 hover:text-[#1A1C20] transition-all bg-white hover:bg-gray-50 p-6 rounded-full hidden sm:block shadow-sm border border-gray-100 hover:translate-x-1 z-50" onClick={showNext}><ChevronRight size={28} /></button>
          <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 text-[#1A1C20] font-bold tracking-[0.2em] text-[10px] md:text-[11px] bg-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg border border-gray-50">{selectedImgIndex + 1} / {filteredImages.length}</div>
        </div>
      )}
    </div>
  );
}

// --- STREAMING_CHUNK:Defining ContactSection Component... ---
function ContactSection({ data, updateData, showToast }) {
  return (
    <div className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="text-center mb-16 md:mb-24">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-6 block">Reach Out</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1A1C20] tracking-tight">Contact <span className="font-serif italic font-light text-gray-500">Us.</span></h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-[#F0E8DD]/90 to-white/95 backdrop-blur-2xl p-10 md:p-12 lg:p-16 rounded-[3rem] md:rounded-[4rem] border border-white shadow-[0_10px_40px_rgb(0,0,0,0.04)] h-full flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1C20] border-b border-gray-200/60 pb-8 md:pb-10 mb-8 md:mb-10">Corporate <span className="italic font-light">Office</span></h2>
            <div className="space-y-10 md:space-y-12">
              <div className="flex items-start space-x-6 md:space-x-8 group">
                 <div className="p-4 md:p-5 bg-white rounded-full text-gray-500 shadow-sm border border-gray-50 group-hover:bg-[#1A1C20] group-hover:text-white transition-colors duration-500"><MapPin size={24} /></div>
                 <div className="pt-2">
                   <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 md:mb-3">Address</p>
                   <p className="font-medium text-[#1A1C20] text-sm md:text-base leading-relaxed">{data.contact.address}</p>
                 </div>
              </div>
              <div className="flex items-start space-x-6 md:space-x-8 group">
                 <div className="p-4 md:p-5 bg-white rounded-full text-gray-500 shadow-sm border border-gray-50 group-hover:bg-[#1A1C20] group-hover:text-white transition-colors duration-500"><Phone size={24} /></div>
                 <div className="pt-2">
                   <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 md:mb-3">Phone</p>
                   <p className="font-medium text-[#1A1C20] text-sm md:text-base">{data.contact.phone}</p>
                 </div>
              </div>
              <div className="flex items-start space-x-6 md:space-x-8 group">
                 <div className="p-4 md:p-5 bg-white rounded-full text-gray-500 shadow-sm border border-gray-50 group-hover:bg-[#1A1C20] group-hover:text-white transition-colors duration-500"><Mail size={24} /></div>
                 <div className="pt-2">
                   <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 md:mb-3">Email</p>
                   <p className="font-medium text-[#1A1C20] text-sm md:text-base break-all">{data.contact.email}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white/95 backdrop-blur-3xl p-10 md:p-12 lg:p-16 rounded-[3rem] md:rounded-[4rem] border border-white shadow-[0_15px_50px_rgb(0,0,0,0.05)] h-full">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1C20] mb-8 md:mb-10">Send an <span className="italic font-light">Inquiry</span></h2>
            <form className="space-y-6 md:space-y-8" onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const newMessage = { id: Date.now(), name: fd.get('name'), email: fd.get('email'), message: fd.get('message'), date: new Date().toLocaleDateString() };
              updateData(prev => ({ ...prev, messages: [newMessage, ...(prev.messages || [])] }));
              showToast("Inquiry submitted elegantly. We will reply promptly.");
              e.target.reset();
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-4 md:ml-5">Full Name</label>
                  <input type="text" name="name" required className="w-full p-5 md:p-6 bg-[#FDFCFB] border-none rounded-[1.5rem] md:rounded-[2rem] focus:ring-2 focus:ring-[#1A1C20]/10 transition-all text-sm font-medium shadow-inner border border-gray-50" />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-4 md:ml-5">Email Address</label>
                  <input type="email" name="email" required className="w-full p-5 md:p-6 bg-[#FDFCFB] border-none rounded-[1.5rem] md:rounded-[2rem] focus:ring-2 focus:ring-[#1A1C20]/10 transition-all text-sm font-medium shadow-inner border border-gray-50" />
                </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-4 md:ml-5">Message</label>
                 <textarea name="message" required rows="5" className="w-full p-5 md:p-6 bg-[#FDFCFB] border-none rounded-[2rem] md:rounded-[2.5rem] focus:ring-2 focus:ring-[#1A1C20]/10 transition-all text-base font-medium resize-none shadow-inner border border-gray-50 leading-relaxed"></textarea>
              </div>
              <button type="submit" className="px-10 md:px-12 py-5 md:py-6 bg-[#1A1C20] text-white uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-bold rounded-full hover:bg-gray-800 transition-all duration-500 w-full sm:w-auto shadow-[0_15px_30px_rgb(26,28,32,0.2)] hover:-translate-y-1 mt-4 md:mt-6">Send Message</button>
            </form>
          </div>
        </div>
        
        {/* Full width map */}
        <div className="lg:col-span-12 h-[400px] md:h-[550px] w-full bg-white/70 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.03)] border border-white p-3 md:p-4 relative group mt-8 md:mt-12">
           <div className="absolute inset-3 md:inset-4 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden pointer-events-none transition-opacity duration-500 group-hover:pointer-events-auto">
             <iframe src={data.contact.mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office Location" className="absolute inset-0 filter grayscale contrast-125 opacity-70 mix-blend-multiply"></iframe>
           </div>
           <div className="absolute inset-3 md:inset-4 bg-[#FDFCFB]/30 backdrop-blur-[4px] rounded-[2.5rem] md:rounded-[4rem] flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-700">
             <span className="bg-white/95 backdrop-blur-xl text-[#1A1C20] px-8 md:px-10 py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] shadow-2xl flex items-center gap-3 border border-white"><MapPin size={20}/> Interactive Map</span>
           </div>
        </div>
      </div>
    </div>
  );
}

// --- STREAMING_CHUNK:Defining Admin Dashboard Component... ---
function AdminDashboard({ data, updateData, logout, showToast }) {
  const [activeTab, setActiveTab] = useState('general');
  const [newProject, setNewProject] = useState({ name: '', desc: '', location: '', img: '', category: 'Commercial', isFeatured: false, color: 'sage' });
  const [newGallery, setNewGallery] = useState({ src: '', category: 'Sites' });
  const [newReview, setNewReview] = useState({ author: '', role: '', rating: 5, text: '', date: 'Just now', source: 'Direct' });

  // --- AUTO-COMPRESSING BASE64 IMAGE CONVERTER ---
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    showToast("Compressing image...", "success");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Cap the maximum size to 1200px (shrinks huge phone photos)
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height *= MAX_WIDTH / width));
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width *= MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG at 70% quality to drastically reduce file size
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        // Safety check (Base64 string length * 0.75 = rough size in bytes)
        const sizeInBytes = compressedBase64.length * 0.75;
        if (sizeInBytes > 950000) {
          showToast("Image still too large after compression.", "error");
        } else {
          callback(compressedBase64); 
          showToast("Image compressed & ready!", "success");
        }
      };
    };
  };

  const handleAssetChange = (e) => updateData({ ...data, assets: { ...data.assets, [e.target.name]: e.target.value } });
  const handleAssetFileChange = (key) => (e) => handleImageUpload(e, (base64) => updateData({ ...data, assets: { ...data.assets, [key]: base64 } }));
  const handleContactChange = (e) => updateData({ ...data, contact: { ...data.contact, [e.target.name]: e.target.value } });

  const handleAddProject = (e) => { 
    e.preventDefault(); 
    updateData({ ...data, projects: [{ ...newProject, id: Date.now(), showOnHome: false }, ...data.projects] }); 
    setNewProject({ name: '', desc: '', location: '', img: '', category: 'Commercial', isFeatured: false, color: 'sage' }); 
    showToast("Project added successfully");
  };
  const toggleProjectHome = (id) => updateData({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, showOnHome: !p.showOnHome } : p) });
  const deleteProject = (id) => { updateData({ ...data, projects: data.projects.filter(p => p.id !== id) }); showToast("Project deleted", "error"); };

  const handleAddGallery = (e) => { 
    e.preventDefault(); 
    updateData({ ...data, gallery: [{ ...newGallery, id: Date.now(), showOnHome: false }, ...data.gallery] }); 
    setNewGallery({ src: '', category: 'Sites' }); 
    showToast("Image added to gallery");
  };
  const toggleGalleryHome = (id) => updateData({ ...data, gallery: data.gallery.map(g => g.id === id ? { ...g, showOnHome: !g.showOnHome } : g) });
  const deleteGallery = (id) => { updateData({ ...data, gallery: data.gallery.filter(g => g.id !== id) }); showToast("Image deleted", "error"); };

  const handleAddReview = (e) => { 
    e.preventDefault(); 
    updateData({ ...data, reviews: [{ ...newReview, id: Date.now(), rating: Number(newReview.rating) }, ...(data.reviews || [])] }); 
    setNewReview({ author: '', role: '', rating: 5, text: '', date: 'Just now', source: 'Direct' }); 
    showToast("Review published");
  };
  const deleteReview = (id) => { updateData({ ...data, reviews: data.reviews.filter(r => r.id !== id) }); showToast("Review deleted", "error"); };

  return (
    <div className="pt-48 md:pt-56 pb-40 px-6 md:px-12 max-w-7xl mx-auto animate-fadeIn min-h-screen relative z-10 w-full">
      
      <div className="bg-[#1A1C20] text-white p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] mb-12 md:mb-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <div className="flex items-center gap-6 md:gap-8 relative z-10">
           <div className="bg-white/10 p-5 md:p-6 rounded-full border border-white/10"><Settings size={32} /></div>
           <div>
             <h3 className="font-serif text-3xl md:text-4xl tracking-tight">Command Center</h3>
             <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mt-2 md:mt-3">Live Sync Active</p>
           </div>
        </div>
        <button onClick={logout} className="px-8 md:px-10 py-4 md:py-5 bg-white text-[#1A1C20] hover:bg-gray-100 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-colors w-full sm:w-auto shadow-lg relative z-10">Log Out</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 md:gap-12">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-72 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          {['general', 'projects', 'gallery', 'reviews', 'consultations', 'messages'].map((tab) => (
             <button 
               key={tab} 
               onClick={() => setActiveTab(tab)} 
               className={`text-center lg:text-left px-8 lg:px-10 py-4 lg:py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] transition-all duration-500 flex-shrink-0 ${activeTab === tab ? 'bg-[#1A1C20] text-white shadow-xl' : 'bg-white/70 backdrop-blur-md text-gray-500 hover:bg-white border border-white/80 shadow-sm'}`}
             >
               {tab}
             </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white/90 backdrop-blur-3xl p-6 md:p-10 lg:p-16 rounded-[3rem] md:rounded-[4rem] shadow-[0_10px_40px_rgb(0,0,0,0.03)] border border-white min-h-[700px] w-full overflow-hidden">
          
          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <div className="space-y-16 md:space-y-20 animate-fadeIn">
              <section>
                <h3 className="text-3xl md:text-4xl font-serif mb-8 md:mb-10 border-b border-gray-100 pb-6 md:pb-8 text-[#1A1C20]">Brand Imagery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {Object.entries(data.assets).map(([key, value]) => {
                    if (key === 'coverPhotos') return null; 
                    return (
                      <div key={key} className="space-y-4 md:space-y-5 p-6 md:p-10 border border-gray-100 rounded-[2.5rem] md:rounded-[3rem] bg-[#FDFCFB] shadow-sm">
                        <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <div className="flex flex-col gap-4 md:gap-5">
                          <input type="text" name={key} value={value.startsWith('data:') ? 'Local File Uploaded' : value} onChange={handleAssetChange} className="w-full p-4 md:p-5 bg-white border border-gray-50 rounded-2xl text-xs md:text-sm font-medium shadow-[0_2px_10px_rgb(0,0,0,0.02)] focus:ring-2 focus:ring-[#1A1C20]/10" placeholder="Image URL" readOnly={value.startsWith('data:')} />
                          <input type="file" accept="image/*" onChange={handleAssetFileChange(key)} className="w-full text-xs md:text-sm font-medium file:mr-4 md:file:mr-5 file:py-2 md:file:py-3 file:px-4 md:file:px-6 file:rounded-full file:border-0 file:text-[9px] md:file:text-[10px] file:uppercase file:tracking-[0.2em] file:font-bold file:bg-[#1A1C20] file:text-white cursor-pointer" />
                        </div>
                        <div className="h-40 md:h-48 bg-white rounded-3xl overflow-hidden shadow-sm p-1.5 mt-5 md:mt-6 border border-gray-100"><img src={value} className="w-full h-full object-cover rounded-[1.5rem]" alt="Preview" /></div>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section>
                <h3 className="text-3xl md:text-4xl font-serif mb-8 md:mb-10 border-b border-gray-100 pb-6 md:pb-8 text-[#1A1C20]">Corporate Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 p-8 md:p-12 border border-gray-100 rounded-[3rem] md:rounded-[4rem] bg-[#FDFCFB] shadow-sm">
                  {Object.entries(data.contact).map(([key, value]) => (
                    <div key={key} className={`space-y-3 md:space-y-4 ${key === 'mapUrl' ? 'md:col-span-2' : ''}`}>
                      <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{key.replace(/([A-Z])/g, ' $1')}</label>
                      <input type="text" name={key} value={value} onChange={handleContactChange} className="w-full p-5 md:p-6 bg-white border border-gray-50 rounded-2xl focus:ring-2 focus:ring-[#1A1C20]/10 font-medium shadow-[0_2px_10px_rgb(0,0,0,0.02)] text-sm md:text-base" />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-16 md:space-y-20 animate-fadeIn">
               <section className="bg-gradient-to-br from-[#FDFCFB] to-[#F7F4EF]/30 p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-gray-100 shadow-sm">
                 <h3 className="text-2xl md:text-3xl font-serif mb-8 md:mb-10 text-[#1A1C20] flex items-center gap-4 md:gap-5"><div className="p-3 md:p-4 bg-white rounded-full shadow-sm border border-gray-50"><Plus size={24}/></div> Add Project</h3>
                 <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <input type="text" placeholder="Project Name" required value={newProject.name} onChange={e=>setNewProject({...newProject, name: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base focus:ring-2 focus:ring-[#1A1C20]/10" />
                    <input type="text" placeholder="Location" required value={newProject.location} onChange={e=>setNewProject({...newProject, location: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base focus:ring-2 focus:ring-[#1A1C20]/10" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:col-span-2 lg:col-span-1">
                      <select required value={newProject.category} onChange={e=>setNewProject({...newProject, category: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base focus:ring-2 focus:ring-[#1A1C20]/10 cursor-pointer">
                         <option value="Commercial">Commercial</option><option value="Residential">Residential</option><option value="Infrastructure">Infrastructure</option>
                      </select>
                      <select required value={newProject.color} onChange={e=>setNewProject({...newProject, color: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base focus:ring-2 focus:ring-[#1A1C20]/10 cursor-pointer">
                         <option value="sage">Sage Green</option><option value="rose">Dusty Rose</option><option value="sky">Powder Blue</option><option value="lilac">Soft Lilac</option><option value="sand">Warm Sand</option>
                      </select>
                    </div>

                    <input type="text" placeholder="Brief Description" required value={newProject.desc} onChange={e=>setNewProject({...newProject, desc: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base focus:ring-2 focus:ring-[#1A1C20]/10 lg:col-span-1" />
                    
                    <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 bg-white p-5 md:p-6 border border-gray-50 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                      {newProject.img ? <img src={newProject.img} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-[1.5rem] md:rounded-[2rem] border border-gray-100" alt="Preview" /> : <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FDFCFB] rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-gray-300 border border-gray-100"><ImageIcon size={40}/></div>}
                      <div className="flex-1 flex flex-col gap-3 md:gap-4 w-full px-2 md:px-4">
                        <input type="text" placeholder="Image URL (Or upload file)" value={newProject.img.startsWith('data:') ? 'Local File Selected' : newProject.img} onChange={e=>setNewProject({...newProject, img: e.target.value})} className="w-full p-3 md:p-4 bg-[#FDFCFB] border border-gray-100 rounded-xl text-xs md:text-sm font-medium focus:ring-2 focus:ring-[#1A1C20]/10" readOnly={newProject.img.startsWith('data:')} />
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, base64 => setNewProject({...newProject, img: base64}))} className="text-xs md:text-sm font-medium file:mr-4 md:file:mr-5 file:py-2 md:file:py-3 file:px-4 md:file:px-6 file:rounded-full file:border-0 file:text-[9px] md:file:text-[10px] file:uppercase file:tracking-[0.2em] file:font-bold file:bg-[#1A1C20] file:text-white cursor-pointer" />
                      </div>
                    </div>
                    
                    <label className="flex items-center gap-4 md:gap-5 md:col-span-2 p-5 md:p-6 bg-white border border-gray-50 rounded-2xl cursor-pointer shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                      <input type="checkbox" checked={newProject.isFeatured} onChange={e=>setNewProject({...newProject, isFeatured: e.target.checked})} className="w-5 h-5 md:w-6 md:h-6 accent-[#1A1C20] rounded" /> 
                      <span className="font-bold text-gray-500 text-[10px] md:text-[11px] uppercase tracking-[0.2em]">Highlight on Home Page</span>
                    </label>
                    <button type="submit" className="md:col-span-2 py-5 md:py-6 bg-[#1A1C20] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] shadow-[0_10px_20px_rgb(26,28,32,0.2)] transition-transform duration-500 hover:-translate-y-1 mt-2 md:mt-4">Publish Project</button>
                 </form>
               </section>
               <section>
                 <h3 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-[#1A1C20] border-b border-gray-100 pb-6 md:pb-8">Manage Portfolio</h3>
                 <div className="space-y-6 md:space-y-8">
                   {data.projects.map(item => (
                     <div key={item.id} className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center bg-[#FDFCFB] border border-gray-100 p-4 md:p-5 rounded-[3rem] md:rounded-[4rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                       <img src={item.img} alt={item.name} className="w-full sm:w-40 h-48 sm:h-40 object-cover rounded-[2.5rem] md:rounded-[3rem]" />
                       <div className="flex-1 text-center sm:text-left px-2 md:px-4">
                         <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 md:gap-4 mb-2 md:mb-3">
                           <h4 className="font-bold text-[#1A1C20] text-xl md:text-2xl whitespace-normal break-words">{item.name}</h4>
                           <span className="text-[8px] md:text-[9px] font-bold uppercase bg-white border border-gray-100 shadow-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full text-gray-500 tracking-[0.2em]">{item.category}</span>
                           {item.isFeatured && <span className="text-[8px] md:text-[9px] font-bold uppercase bg-[#1A1C20] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-2 tracking-[0.2em] shadow-sm"><Star size={12}/> Featured</span>}
                         </div>
                         <p className="text-sm md:text-base text-gray-500 font-light whitespace-normal break-words">{item.desc}</p>
                       </div>
                       <div className="flex items-center gap-4 md:gap-6 bg-white p-4 md:p-5 rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-gray-50 w-full sm:w-auto justify-center flex-shrink-0">
                         <label className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer text-gray-500"><input type="checkbox" checked={item.showOnHome} onChange={() => toggleProjectHome(item.id)} className="w-4 h-4 md:w-5 md:h-5 accent-[#1A1C20] rounded" /> Home</label>
                         <div className="w-[1px] h-8 md:h-10 bg-gray-200"></div>
                         <button onClick={() => deleteProject(item.id)} className="p-3 md:p-4 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={18}/></button>
                       </div>
                     </div>
                   ))}
                   {data.projects.length === 0 && <p className="text-center py-20 md:py-24 border border-dashed border-gray-200 rounded-[3rem] md:rounded-[4rem] text-gray-400 font-medium text-base md:text-lg">No projects available.</p>}
                 </div>
               </section>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-16 md:space-y-20 animate-fadeIn">
               <section className="bg-gradient-to-br from-[#FDFCFB] to-[#F0EBF4]/30 p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-gray-100 shadow-sm">
                 <h3 className="text-2xl md:text-3xl font-serif mb-8 md:mb-10 text-[#1A1C20] flex items-center gap-4 md:gap-5"><div className="p-3 md:p-4 bg-white shadow-sm border border-gray-50 rounded-full"><ImageIcon size={24}/></div> Upload Image</h3>
                 <form onSubmit={handleAddGallery} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <select required value={newGallery.category} onChange={e=>setNewGallery({...newGallery, category: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base sm:col-span-2 focus:ring-2 focus:ring-[#1A1C20]/10 cursor-pointer">
                       <option value="Sites">Sites</option><option value="Completed">Completed</option><option value="Team">Team</option>
                    </select>
                    <div className="sm:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 bg-white p-5 md:p-6 border border-gray-50 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                      {newGallery.src ? <img src={newGallery.src} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-[1.5rem] md:rounded-[2rem] border border-gray-100" alt="Preview" /> : <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FDFCFB] rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-gray-300 border border-gray-100"><ImageIcon size={40}/></div>}
                      <div className="flex-1 w-full flex flex-col gap-3 md:gap-4 px-2 md:px-4">
                         <input type="text" placeholder="Image URL" value={newGallery.src.startsWith('data:') ? 'Local File Selected' : newGallery.src} onChange={e=>setNewGallery({...newGallery, src: e.target.value})} className="w-full p-3 md:p-4 bg-[#FDFCFB] border border-gray-100 rounded-xl text-xs md:text-sm font-medium focus:ring-2 focus:ring-[#1A1C20]/10" readOnly={newGallery.src.startsWith('data:')} />
                         <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, base64 => setNewGallery({...newGallery, src: base64}))} className="text-xs md:text-sm font-medium file:mr-4 md:file:mr-5 file:py-2 md:file:py-3 file:px-4 md:file:px-6 file:rounded-full file:border-0 file:text-[9px] md:file:text-[10px] file:uppercase file:tracking-[0.2em] file:font-bold file:bg-[#1A1C20] file:text-white cursor-pointer" />
                      </div>
                    </div>
                    <button type="submit" className="sm:col-span-2 py-5 md:py-6 bg-[#1A1C20] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] shadow-[0_10px_20px_rgb(26,28,32,0.2)] transition-transform duration-500 hover:-translate-y-1 mt-2 md:mt-4">Add Image</button>
                 </form>
               </section>
               <section>
                 <h3 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-[#1A1C20] border-b border-gray-100 pb-6 md:pb-8">Image Grid</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                   {data.gallery.map(img => (
                     <div key={img.id} className="relative group rounded-[3rem] md:rounded-[3.5rem] overflow-hidden h-64 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-2 border border-gray-100">
                       <img src={img.src} alt={img.category} className="w-full h-full object-cover rounded-[2.5rem] md:rounded-[3rem]" />
                       <div className="absolute inset-2 rounded-[2.5rem] md:rounded-[3rem] bg-[#1A1C20]/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center gap-4 md:gap-6">
                          <label className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] text-white font-bold uppercase tracking-[0.2em] cursor-pointer"><input type="checkbox" checked={img.showOnHome} onChange={() => toggleGalleryHome(img.id)} className="w-4 h-4 md:w-5 md:h-5 accent-white rounded" /> Home View</label>
                          <button onClick={() => deleteGallery(img.id)} className="px-6 md:px-8 py-2 md:py-3 bg-red-500 text-white text-[9px] md:text-[10px] rounded-full uppercase font-bold tracking-[0.2em] shadow-lg hover:bg-red-600 transition-colors">Remove</button>
                       </div>
                       <span className="absolute top-5 md:top-6 left-5 md:left-6 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] bg-white/95 backdrop-blur text-[#1A1C20] px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">{img.category}</span>
                     </div>
                   ))}
                   {data.gallery.length === 0 && <p className="col-span-full py-20 md:py-24 text-center border border-dashed border-gray-200 rounded-[3rem] md:rounded-[4rem] text-gray-400 font-medium text-base md:text-lg">No images uploaded.</p>}
                 </div>
               </section>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-16 md:space-y-20 animate-fadeIn">
               <section className="bg-gradient-to-br from-[#FDFCFB] to-[#F6EFEF]/30 p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-gray-100 shadow-sm">
                 <h3 className="text-2xl md:text-3xl font-serif mb-8 md:mb-10 text-[#1A1C20] flex items-center gap-4 md:gap-5"><div className="p-3 md:p-4 bg-white shadow-sm border border-gray-50 rounded-full"><Quote size={24}/></div> Add Testimonial</h3>
                 <form onSubmit={handleAddReview} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <input type="text" placeholder="Client Name" required value={newReview.author} onChange={e=>setNewReview({...newReview, author: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base focus:ring-2 focus:ring-[#1A1C20]/10" />
                    <input type="text" placeholder="Role (e.g., Architect, Homeowner)" required value={newReview.role} onChange={e=>setNewReview({...newReview, role: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base focus:ring-2 focus:ring-[#1A1C20]/10" />
                    <select required value={newReview.rating} onChange={e=>setNewReview({...newReview, rating: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base focus:ring-2 focus:ring-[#1A1C20]/10 cursor-pointer"><option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option><option value="2">2 Stars</option><option value="1">1 Star</option></select>
                    <input type="text" placeholder="Date (e.g., March 2026)" required value={newReview.date} onChange={e=>setNewReview({...newReview, date: e.target.value})} className="p-5 md:p-6 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl font-medium text-sm md:text-base focus:ring-2 focus:ring-[#1A1C20]/10" />
                    <textarea placeholder="Client Feedback..." required value={newReview.text} onChange={e=>setNewReview({...newReview, text: e.target.value})} className="p-6 md:p-8 bg-white border border-gray-50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-[2.5rem] md:rounded-[3rem] font-medium text-sm md:text-base sm:col-span-2 resize-none focus:ring-2 focus:ring-[#1A1C20]/10 leading-relaxed" rows="4"></textarea>
                    <button type="submit" className="sm:col-span-2 py-5 md:py-6 bg-[#1A1C20] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] mt-2 md:mt-4 shadow-[0_10px_20px_rgb(26,28,32,0.2)] transition-transform duration-500 hover:-translate-y-1">Publish Review</button>
                 </form>
               </section>
               <section>
                 <h3 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-[#1A1C20] border-b border-gray-100 pb-6 md:pb-8">Manage Reviews</h3>
                 <div className="space-y-6 md:space-y-8">
                   {(data.reviews || []).map(review => (
                     <div key={review.id} className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start sm:items-center bg-[#FDFCFB] border border-gray-100 p-6 md:p-10 rounded-[3rem] md:rounded-[4rem] shadow-sm">
                       <div className="flex-1 w-full">
                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 md:mb-6 gap-3 md:gap-4">
                           <div>
                             <h4 className="font-bold text-[#1A1C20] text-lg md:text-xl mb-1">{review.author}</h4>
                             <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{review.role}</p>
                           </div>
                           <div className="flex bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm border border-gray-50">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={14} className={i < review.rating ? "text-gray-800 fill-gray-800" : "text-gray-200"} />))}</div>
                         </div>
                         <p className="text-sm md:text-base text-gray-600 font-serif italic leading-relaxed bg-white p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-gray-50 mb-5 md:mb-6">"{review.text}"</p>
                         <div className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-3 md:px-4">{review.date} • {review.source}</div>
                       </div>
                       <button onClick={() => deleteReview(review.id)} className="p-4 md:p-5 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full shadow-sm border border-gray-50 transition-colors self-end sm:self-auto"><Trash2 size={20}/></button>
                     </div>
                   ))}
                   {(!data.reviews || data.reviews.length === 0) && <p className="text-center py-20 md:py-24 border border-dashed border-gray-200 rounded-[3rem] md:rounded-[4rem] text-gray-400 font-medium text-base md:text-lg">No reviews published.</p>}
                 </div>
               </section>
            </div>
          )}

          {/* CONSULTATIONS TAB */}
          {activeTab === 'consultations' && (
            <div className="space-y-10 md:space-y-12 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-8 md:pb-10 mb-8 md:mb-10 gap-4 md:gap-6">
                 <h3 className="text-3xl md:text-4xl font-serif text-[#1A1C20]">Project Requests</h3>
                 <span className="bg-[#1A1C20] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm">{(data.consultations || []).length} Pending</span>
              </div>
              <div className="space-y-6 md:space-y-8">
                {(data.consultations || []).map(consult => (
                  <div key={consult.id} className="bg-gradient-to-br from-[#FDFCFB] to-[#EAF0EB]/20 p-8 md:p-10 border border-gray-100 rounded-[3rem] md:rounded-[4rem] shadow-sm flex flex-col sm:flex-row justify-between gap-6 md:gap-8">
                    <div className="space-y-5 md:space-y-6">
                      <h4 className="font-bold text-[#1A1C20] text-xl md:text-2xl">{consult.name}</h4>
                      <div className="space-y-3 md:space-y-4 bg-white p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-gray-50">
                        <p className="text-sm md:text-base text-gray-600 font-medium flex items-center gap-3 md:gap-4"><Calendar size={18} className="text-gray-400"/> Date: <span className="text-[#1A1C20]">{consult.date}</span></p>
                        <p className="text-sm md:text-base text-gray-600 font-medium flex items-center gap-3 md:gap-4"><Building size={18} className="text-gray-400"/> Scope: <span className="text-[#1A1C20]">{consult.projectType}</span></p>
                        <p className="text-sm md:text-base text-gray-600 font-medium flex items-center gap-3 md:gap-4"><Phone size={18} className="text-gray-400"/> Phone: <span className="text-[#1A1C20]">{consult.phone}</span></p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-start sm:items-end">
                       <span className="text-[9px] md:text-[10px] font-bold uppercase bg-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-gray-500 tracking-[0.2em] shadow-sm border border-gray-50">{consult.status}</span>
                       <button onClick={() => {updateData({...data, consultations: data.consultations.filter(c => c.id !== consult.id)}); showToast("Request archived");}} className="p-4 md:p-5 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full shadow-sm border border-gray-50 transition-colors mt-6 md:mt-8"><Trash2 size={20}/></button>
                    </div>
                  </div>
                ))}
                {(!data.consultations || data.consultations.length === 0) && <p className="text-gray-400 font-medium py-20 md:py-24 border border-dashed border-gray-200 rounded-[3rem] md:rounded-[4rem] text-center text-base md:text-lg">No pending consultation requests.</p>}
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="space-y-10 md:space-y-12 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-8 md:pb-10 mb-8 md:mb-10 gap-4 md:gap-6">
                 <h3 className="text-3xl md:text-4xl font-serif text-[#1A1C20]">Inquiry Inbox</h3>
                 <span className="bg-[#1A1C20] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm">{(data.messages || []).length} Messages</span>
              </div>
              <div className="space-y-6 md:space-y-8">
                {(data.messages || []).map(msg => (
                  <div key={msg.id} className="bg-gradient-to-br from-[#FDFCFB] to-[#F7F4EF]/20 p-8 md:p-10 border border-gray-100 rounded-[3rem] md:rounded-[4rem] shadow-sm flex flex-col gap-6 md:gap-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 gap-4 md:gap-5">
                       <div>
                         <h4 className="font-bold text-[#1A1C20] text-xl md:text-2xl mb-1 md:mb-2">{msg.name}</h4>
                         <a href={`mailto:${msg.email}`} className="text-sm md:text-base font-medium text-gray-500 hover:text-[#1A1C20] transition-colors flex items-center gap-2 md:gap-3"><Mail size={16}/> {msg.email}</a>
                       </div>
                       <span className="text-[9px] md:text-[10px] text-gray-400 font-bold bg-white shadow-sm border border-gray-50 px-4 md:px-5 py-2 md:py-2.5 rounded-full uppercase tracking-[0.2em]">{msg.date}</span>
                    </div>
                    <p className="text-base md:text-lg text-gray-600 font-serif leading-relaxed bg-white p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm border border-gray-50 italic">"{msg.message}"</p>
                    <div className="flex justify-end pt-2 md:pt-4">
                       <button onClick={() => {updateData({...data, messages: data.messages.filter(m => m.id !== msg.id)}); showToast("Message deleted");}} className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-red-600 flex items-center gap-2 md:gap-3 transition-colors px-6 md:px-8 py-3 md:py-4 rounded-full bg-white shadow-sm border border-gray-50 hover:bg-red-50"><Trash2 size={16}/> Archive</button>
                    </div>
                  </div>
                ))}
                {(!data.messages || data.messages.length === 0) && <p className="text-gray-400 font-medium py-20 md:py-24 border border-dashed border-gray-200 rounded-[3rem] md:rounded-[4rem] text-center text-base md:text-lg">Inbox is empty.</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}