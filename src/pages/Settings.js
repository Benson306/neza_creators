import React, { useContext, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button, Label
} from '@windmill/react-ui';
import { MailIcon, PasswordIcon } from '../icons';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const { email, uid, addEmail, logout } = useContext(AuthContext);
  const [currPassword, setCurrPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [changedEmail, setChangedEmail] = useState(null);
  const [emailPassword, setEmailPassword] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const handleEmailChange = () => {
    setSubmitLoading(true);
    if(changedEmail == null || emailPassword == null){
      setSubmitLoading(false);
      toast.error('All fields must be filled', {
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

    fetch(`${process.env.REACT_APP_API_URL}/change_creator_email`,{
      method: 'PUT',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        _id: uid,
        emailPassword,
        currentEmail: email,
        changedEmail
      })
    })
    .then(res => {
      if(res.ok){
        setSubmitLoading(false);
        addEmail(changedEmail);
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
        setEmailPassword(null);
        setChangedEmail(null);
        closeModal();
        window.location.reload();
      }else{
        if(res.status == 401){
          setSubmitLoading(false);
          toast.error('Unauthorized', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }else{
          setSubmitLoading(false);
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
      }
    })
    .catch(err => {
      setSubmitLoading(false);
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

  const handlePasswordChange = () => {
    if(currPassword == null || newPassword == null){
      toast.error('Current and new password must be filled', {
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

    fetch(`${process.env.REACT_APP_API_URL}/change_creator_password`,{
      method: 'PUT',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        _id: uid,
        currPassword,
        newPassword
      })
    })
    .then(res => {
      if(res.ok){
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
        setTimeout(()=>{
          window.location.reload();
        },1500)
      }else{
        if(res.status == 401){
          toast.error('Unauthorized', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
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

  const navigate = useNavigate();

  const handleForgotPassword = () => {
    logout();
    navigate("/forgot-password");
  }

  return (
    <div>
      <ToastContainer />
        <PageTitle>Account settings</PageTitle>
        <div className='mx-5'>
          <SectionTitle>Email address</SectionTitle>
          <div className='block lg:flex gap-32 text-sm'>
              <p className='dark:text-gray-500'>Your email is <b>{email}</b></p>
              <button 
                onClick={e => {
                  e.preventDefault();
                  openModal();
                }} 
                className='underline text-blue-600 hover:text-blue-500'
              >change</button>
          </div>

          <div className='mt-10'>
            <SectionTitle>Password</SectionTitle>
            <div className='block lg:flex gap-16 text-sm'>
              <div className='mb-2 lg:mb-0'>
                  <div className='mb-2 dark:text-gray-500 text-sm'>Current password</div>
                  <input type="password" onChange={e => setCurrPassword(e.target.value)} className='p-2 border border-gray-400 rounded-lg dark:text-white bg-transparent' />
              </div>

              <div>
                  <div className='mb-2 dark:text-gray-500 text-sm'>New password</div>
                  <input type="password" onChange={e => setNewPassword(e.target.value)} className='p-2 border border-gray-400 rounded-lg dark:text-white bg-transparent' />
              </div>
            </div>
            <div className='dark:text-gray-500 text-xs mt-5 block lg:flex gap-2'>
              <div>Can't remember your current password?</div>
              <button onClick={e => {
                e.preventDefault();
                handleForgotPassword();
              }} className='underline text-blue-600 hover:text-blue-500 mt-2 lg:mt-0'>Reset your password</button>
            </div>
            <button
            onClick={e => {
              e.preventDefault();
                handlePasswordChange();
              }}  
              className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg text-xs mt-4'>
              Save password
            </button>
          </div>

          <div className='mt-10 mb-10'>
            <SectionTitle>Delete account</SectionTitle>
            <p className='dark:text-gray-500 text-sm'>Would you like to delete your account?</p>
            <p className='dark:text-gray-500 text-xs'>Deleting your account will remove all the content associated with it.</p>
            <button className='underline text-red-500 hover:text-red-600 rounded-lg text-sm mt-4'>
              I want to delete my account
            </button>
          </div>
        </div>
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="text-center">Change Email</ModalHeader>
        <ModalBody>
                <Label className="mt-4">
                <span>New Email</span>
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                  <input
                    type='email'
                    className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                    placeholder="janedoe@gmail.com"
                    onChange={e => setChangedEmail(e.target.value)}
                  />
                  <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                    <MailIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>
                </Label>
                <Label className="mt-4">
                <span>Password</span>
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
                  <input
                    type='password'
                    className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                    onChange={e => setEmailPassword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                    <PasswordIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>
                </Label>
        </ModalBody>
        <ModalFooter class="justify-center">
            <div className='flex justify-center mt-4 mb-1'>
                { submitLoading && <div className='border border-green-600 p-2 w-full rounded-lg text-center text-green-600 text-sm'>
                    Loading ....
                    </div> }
                { !submitLoading && <Button onClick={
                ()=>{
                  handleEmailChange();
                }
                } class="bg-green-600 p-2 rounded-lg text-sm text-white w-full">
                    Change Email
                </Button> }
            </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Settings