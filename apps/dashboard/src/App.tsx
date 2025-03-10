import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { axiosInstance } from './utils/axios.utils'
import { Route, Routes } from 'react-router-dom'
import { Login } from './routes/Auth/Login'
import { Signup } from './routes/Auth/Signup'
import { Dashboard } from './routes/Dashboard/Dashboard'
import ProtectedRoute from './Layouts/ProtectedRoute'
import { StudyMaterials } from './routes/Dashboard/StudyMaterials'
import { NotFound } from './routes/NotFound'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axiosInstance.get("/api/live").then((res) => {
      console.log(res.data);
    }
    );
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='study-materials' element={<StudyMaterials />} />
        </Route>
        {/* protected routes */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
