import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbartop from './components/Navbartop'
import Home from './components/Home'
import Eligibility from './components/Eligibility'
import JobsGermany from './components/JobsGermany'
import Footer from './components/Footer'
import Visa from './components/Visa'
import Invest from './components/Invest'
import About from './components/About'
import StipendProgram from './components/StipendProgram'
import ArtsTech from './components/ArtsTech'

// Create placeholder components for other routes

const Study = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>Study Abroad</h1>
      <p>Explore our comprehensive study abroad programs</p>
    </div>
  </div>
)

const Work = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>Work Opportunities</h1>
      <p>Find international work opportunities</p>
    </div>
  </div>
)

const Coaching = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>Coaching Services</h1>
      <p>Professional coaching for language tests</p>
    </div>
  </div>
)

// const Visa = () => (
//   <div className="page-container">
//     <div className="page-content">
//       <h1>Visa Assistance</h1>
//       <p>Complete visa guidance and support</p>
//     </div>
//   </div>
// )

// const About = () => (
//   <div className="page-container">
//     <div className="page-content">
//       <h1>About our servicse</h1>
//       <p>Welcome to payana overseas </p>
//     </div>
//   </div>
// )

// Study sub-pages
// const ArtsTech = () => (
//   <div className="page-container">
//     <div className="page-content">
//       <h1>Arts & Technology Programs</h1>
//       <p>Creative and technical programs worldwide</p>
//     </div>
//   </div>
// )

const MBBS = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>MBBS Programs</h1>
      <p>Medical degree programs in top universities</p>
    </div>
  </div>
)

const MedicalPG = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>Medical PG Programs</h1>
      <p>Postgraduate medical specialization</p>
    </div>
  </div>
)

const FreeAusbildung = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>Free Ausbildung</h1>
      <p>German vocational training programs</p>
    </div>
  </div>
)

// Work sub-pages
// const StipendProgram = () => (
//   <div className="page-container">
//     <div className="page-content">
//       <h1>Stipend Programs</h1>
//       <p>Funded work and study opportunities</p>
//     </div>
//   </div>
// )

// const JobsGermany = () => (
//   <div className="page-container">
//     <div className="page-content">
//       <h1>Jobs in Germany</h1>
//       <p>Career opportunities in Germany</p>
//     </div>
//   </div>
// )

const JobsCanada = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>Jobs in Canada</h1>
      <p>Career opportunities in Canada</p>
    </div>
  </div>
)

// Coaching sub-pages
const IELTS = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>IELTS Coaching</h1>
      <p>Professional IELTS preparation</p>
    </div>
  </div>
)

const PTE = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>PTE Coaching</h1>
      <p>Expert PTE Academic training</p>
    </div>
  </div>
)

const TOEFL = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>TOEFL Coaching</h1>
      <p>Comprehensive TOEFL preparation</p>
    </div>
  </div>
)

const LanguagePage = () => (
  <div className="page-container">
    <div className="page-content">
      <h1>Language Training</h1>
      <p>Multi-language learning programs</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className='total'>
        <Navbartop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/study" element={<Study />} />
          <Route path="/work" element={<Work />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/about" element={<About />} />
          
          {/* Study sub-routes */}
          <Route path="/study/arts-tech" element={<ArtsTech />} />
          <Route path="/study/mbbs" element={<MBBS />} />
          <Route path="/study/medical-pg" element={<MedicalPG />} />
          <Route path="/study/stipent-program" element={<StipendProgram />} />
          
          {/* Work sub-routes */}
          {/* <Route path="/work/stipend-program" element={<StipendProgram />} /> */}
          <Route path="/work/jobs-germany" element={<JobsGermany />} />
          <Route path="/work/jobs-canada" element={<JobsCanada />} />
          
          {/* Coaching sub-routes */}
          <Route path="/coaching/ielts" element={<IELTS />} />
          <Route path="/coaching/pte" element={<PTE />} />
          <Route path="/coaching/toefl" element={<TOEFL />} />
          <Route path="/coaching/language" element={<LanguagePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
