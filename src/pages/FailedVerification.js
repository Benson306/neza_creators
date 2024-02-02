import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label, Input, Button } from '@windmill/react-ui'

function FailedVerification() {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-3/4 mx-auto">
            <div className="w-full">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">NEZA</h1>

              <h1 className="mb-4 text-md font-semibold text-gray-700 dark:text-gray-200 text-center">Unfortunately your application was rejected. </h1>
              
              <h1 className="mb-4 text-xs text-gray-700 dark:text-gray-200 text-center mt-5">Try again at a later date.</h1>
              <div className='flex justify-center'>
                <Button class="bg-red-600 p-2 rounded-lg text-sm text-white w-full lg:w-1/2  mt-4 text-center" block
                onClick={() => handleLogout()}
                >
                  Sign Out
                </Button>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default FailedVerification