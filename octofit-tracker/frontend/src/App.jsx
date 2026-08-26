import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand">OCTOFIT <span>TRACKER</span></NavLink>
        <nav aria-label="Primary navigation" className="nav-pills">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Home() {
  return <section className="home-panel"><p className="eyebrow">YOUR FITNESS, IN MOTION</p><h1>Move with purpose.</h1><p>Track the work, find your people, and make every point count.</p><div className="home-links"><NavLink className="btn btn-dark" to="/activities">View activity</NavLink><NavLink className="btn btn-outline-dark" to="/workouts">Find a workout</NavLink></div></section>
}

export default App
