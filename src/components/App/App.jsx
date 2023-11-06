import { Suspense, lazy, useEffect } from "react"
import{ Routes, Route } from 'react-router-dom'
import { Navigation, Spinner, ProtectedRoute } from "components"
import { useDispatch, useSelector } from "react-redux"
import { getUserToken } from "store/selectors"
import styles from './app.module.css'
import { getCurrentUser } from "store/slices/userSlice"

const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage'))
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'))
const ContactPage = lazy(() => import('../../pages/ContactPage/ContactPage'))
const App = () => {
  const dispatch = useDispatch()
  const userToken = useSelector(getUserToken)

  useEffect(() => {
    if (userToken) {
      dispatch(getCurrentUser(userToken))
    }
    //eslint-disable-next-line
  }, [])
  
  const navigationLinks = [
    {
      label: 'Register',
      link: '/register',
      isVisible: !userToken
    },
    {
      label: 'Login',
      link: '/login',
      isVisible: !userToken
    },
    {
      label: 'Contacts',
      link: '/contacts',
      isVisible: !!userToken
    }
  ]

  return (
    <div className={styles.app}>
      <Suspense fallback={<Spinner />}>
        <Navigation links={navigationLinks}/>
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
