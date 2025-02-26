import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/Home'
import ExercisePage from './pages/Exercises'
import WorkoutPage from './pages/Workouts'
import SessionsPage from './pages/Sesssions'
import RootLayout from './pages/Root'
import ErrorPage from './pages/Error'
import LoginPage from './pages/login'
import ProtectedRoute from './components/ProtectedRoute'
import SignupPage from './pages/signup'
import PreviewPage from './pages/Preview'

const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true,  
        element: 
          <ProtectedRoute>
            <HomePage /> 
          </ProtectedRoute>
      },
      { 
        path: '/preview', 
        element: <PreviewPage /> 
      },
      { 
        path: '/login', 
        element: <LoginPage /> 
      },
      { 
        path: '/signup', 
        element: <SignupPage/> 
      },
      { 
        path: '/exercises', 
        element: 
          <ProtectedRoute>
            <ExercisePage />
          </ProtectedRoute> 
      },
      { 
        path: '/workouts', 
        element: 
          <ProtectedRoute>
            <WorkoutPage />
          </ProtectedRoute> 
      },
      { 
        path: '/sessions', 
        element: 
          <ProtectedRoute>
            <SessionsPage /> 
          </ProtectedRoute>
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
