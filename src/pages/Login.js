import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { addUid, addEmail, addIsVerified, addFirstTime } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = () => {

    if(email == null || password == null){
      toast.error('All Fields Are Required', {
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

    fetch(`${process.env.REACT_APP_API_URL}/creator_login`,{
      method: 'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    })
    .then( response => {
      if(response.ok){
        toast.success('Success', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });

          response.json().then((res)=>{
            addEmail(res.email);
            addUid(res._id);
            addFirstTime(res.firstTimePassword);
            addIsVerified(res.isVerified);

            if(res.firstTimePassword){
              navigate('/change_password');
            }else if(res.status == 0){
              navigate('/app/wallet');
            }else if(res.status == 3){
              navigate('/kyc');
            }else if(res.status == 2){
              navigate('/app/wallet');
            }else if(res.status == 1){
              navigate('/app/wallet');
            }
          });
      }else{
        toast.error('Check your credentials', {
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
      toast.error('Error', {
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
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input onChange={e =>  setEmail(e.target.value)} className="mt-1" type="email" placeholder="john@doe.com" />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input onChange={e =>  setPassword(e.target.value)} className="mt-1" type="password" placeholder="***************" />
              </Label>

              <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full mt-4 text-center" block
              onClick={() => handleSubmit()}
              >
                Log in
              </Button>

              <hr className="my-6" />

              <p >
                <Link
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
