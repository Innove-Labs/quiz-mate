import { useEffect } from 'react'
import './App.css'
import { axiosInstance } from './utils/axios.utils'
import { Route, Routes } from 'react-router-dom'
import { Login } from './routes/Auth/Login'
import { Signup } from './routes/Auth/Signup'
import { Dashboard } from './routes/Dashboard/Dashboard'
import ProtectedRoute from './Layouts/ProtectedRoute'
import { StudyMaterials } from './routes/Dashboard/StudyMaterials'
import { NotFound } from './routes/NotFound'
import { Toaster } from './components/ui/sonner'
import { DashboardLayout } from './Layouts/Dashboard'
import { ClassSubjects } from './routes/Dashboard/ClassSubjects'

function App() {
  useEffect(() => {
    axiosInstance.get("/api/live").then((res) => {
      console.log(res.data);
    }
    ).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* Dashboard with its nested routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='study-materials' element={<StudyMaterials />} />
            <Route path='class-subjects' element={<ClassSubjects />} />
          </Route>
        </Route>
        {/* protected routes */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
