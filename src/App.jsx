import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/Home'
import ExercisePage from './pages/Exercises'
import WorkoutPage from './pages/Workouts'
import SessionsPage from './pages/Sesssions'
import RootLayout from './pages/Root'
import ErrorPage from './pages/Error'
import LoginPage from './pages/login'
import PrivateRoutes from './components/PrivateRoutes'
import SignupPage from './pages/signup'
import PreviewPage from './pages/Preview'
import PublicRoutes from './components/PublicRoutes'

const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true,  
        element: 
          <PrivateRoutes>
            <HomePage /> 
          </PrivateRoutes>
      },
      { 
        path: '/preview', 
        element: 
        <PublicRoutes>
          <PreviewPage /> 
        </PublicRoutes>
      },
      { 
        path: '/login', 
        element: 
          <PublicRoutes>
            <LoginPage /> 
          </PublicRoutes>
      },
      { 
        path: '/signup', 
        element: 
          <PublicRoutes>
            <SignupPage/> 
          </PublicRoutes>
      },
      { 
        path: '/exercises', 
        element: 
          <PrivateRoutes>
            <ExercisePage />
          </PrivateRoutes> 
      },
      { 
        path: '/workouts', 
        element: 
          <PrivateRoutes>
            <WorkoutPage />
          </PrivateRoutes> 
      },
      { 
        path: '/sessions', 
        element: 
          <PrivateRoutes>
            <SessionsPage /> 
          </PrivateRoutes>
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
