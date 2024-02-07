import React, { lazy, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import Sidebar from './components/Sidebar';
import routes from './routes';
import { AuthContext } from './context/AuthContext';
import { SidebarContext } from './context/SidebarContext';
import Header from './components/Header';
import Main from './containers/Main';

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ChangePassword = lazy(()=> import('./pages/ChangePassword'))
const FailedVerification = lazy(()=> import('./pages/FailedVerification'))
const PendingVerification = lazy(()=> import('./pages/PendingVerification'))
const Wallet = lazy(()=> import('./pages/Wallet'))
const Kyc = lazy(()=> import('./pages/Kyc'))

function App() {
  const { uid } = useContext(AuthContext);

  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()

  useEffect(() => {
    closeSidebar()
  }, [location])
  return (
    <>

      {
        uid == null ?

        <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/forgot-password" Component={ForgotPassword} />
            <Route exact path="/*" Component={Login} />
        </Routes>
        :
        <div>
          <Routes>
            <Route path="/change_password" Component={ChangePassword} />
            <Route path="/kyc" Component={Kyc} />
          </Routes>

          <div
            className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
          >
              <Sidebar />
              <div className="flex flex-col flex-1 w-full">
                <Header />
                <Main>
                  <Routes>
                  <Route path="/" Component={Wallet} />
                    {
                      routes.map( route => 
                        <Route path={`/app${route.path}`} Component={route.component} />
                      )
                    }
                  </Routes>
                </Main>
              </div>
          </div>
        </div> 
        
      }
    </>
  )
}

export default App
