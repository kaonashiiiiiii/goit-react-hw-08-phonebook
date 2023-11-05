import { Suspense, lazy } from "react"
import{ Routes, Route } from 'react-router-dom'
import { Navigation, Spinner, ProtectedRoute } from "components"
import { useSelector } from "react-redux"
import { getUserToken } from "store/selectors"
import styles from './app.module.css'

const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage'))
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'))
const ContactPage = lazy(() => import('../../pages/ContactPage/ContactPage'))
const App = () => {
  const userToken = useSelector(getUserToken)
  
  return (
    <div className={styles.app}>
      <Suspense fallback={<Spinner />}>
        <Navigation links={['Register', 'Login', 'Contacts']}/>
        <Routes>
          <Route path="/register" element={<SignupPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/contacts" 
            element={
              <ProtectedRoute isAllowed={!!userToken}>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ProtectedRoute isAllowed={false} redirectPath={userToken ? '/contacts' : '/login'} />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
