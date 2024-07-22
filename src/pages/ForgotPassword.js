import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ImageLight from '../assets/img/forgot-password-office.jpeg'
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg'
import { Label, Input, Button, WindmillContext } from '@windmill/react-ui'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const { mode } = useContext(WindmillContext);
  const [ email, setEmail] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if(email == null){
      toast.error('Email must be filled', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return
    }

    fetch(`${process.env.REACT_APP_API_URL}/reset_creator_password`,{
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email
      })
    })
    .then(res => {
      if(res.ok){
        toast.success('Check your email for new password.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",

        });

        setTimeout(()=>{
          navigate('/');
        }, 2500)
      }else{
          toast.error('Failed. Server Error', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
      }
    })
    .catch(err => {
      toast.error('Failed. Server Error', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden">
        <div className='flex justify-center mb-4'>
              { mode === 'dark' ? (
                <img src={require("../assets/img/LogoWhite.png")} width={100} />
              ) : (
                <img src={require("../assets/img/LogoBlack.png")} width={100} />
              )}
        </div>
        <div className='bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>

              <Label>
                <span>Email</span>
                <Input type="email" onChange={e => setEmail(e.target.value)} className="mt-1" placeholder="user@neza.money" />
              </Label>
            <div className='flex justify-center w-full'>
              <button onClick={e => {
                e.preventDefault();
                handleResetPassword();
              }} block className="w-full text-sm mt-4 bg-green-600 hover:bg-green-500 p-2 rounded-lg text-white">
                Recover password
              </button>
            </div>
            </div>
          </main>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
