import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header'

function Kyc() {

  const [selectedID, setSelectedID] = useState(null);
  const [selectedKra, setSelectedKra] = useState(null);
  const [idNumber, setIDNumber] = useState(null);
  const [kraNumber, setKraNumber] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const { uid } = useContext(AuthContext);
  const location = useLocation();

  const navigate = useNavigate();

  const handleIDChange = (e) => {
      const file = e.target.files[0];
      // Check if the file is an Excel file (xlsx or xls)
      if (file && (file.type === 'application/pdf')) {
      setSelectedID(file);
      } else {
      setSelectedID(null);
      alert('Please upload a valid PDF file');
      }
  };

  const handleIDDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.type === 'application/pdf')) {
      setSelectedID(file);
      } else {
      setSelectedID(null);
      alert('Please upload a valid PDF file');
      }
  };

  const handleIDDelete = () => {
      setSelectedID(null);
  };

  const handleKraChange = (e) => {
    const file = e.target.files[0];
    // Check if the file is an Excel file (xlsx or xls)
    if (file && (file.type === 'application/pdf')) {
    setSelectedKra(file);
    } else {
    setSelectedKra(null);
    alert('Please upload a valid PDF file');
    }
};

const handleKraDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf')) {
    setSelectedKra(file);
    } else {
    setSelectedKra(null);
    alert('Please upload a valid PDF file');
    }
};

const handleKraDelete = () => {
    setSelectedKra(null);
};


  const handleSubmit = () =>{
      if(idNumber == null || kraNumber == null || selectedID == null || selectedKra == null){
        toast.error('All Field must be filled', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          return;
      }

      const phone_regex = /^\+[0-9]{12}$/;
      if(!phone_regex.test(phoneNumber)){
        toast.error('Enter a valid phone number', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          return;
      }

      const formData = new FormData();
      formData.append('id_file', selectedID);
      formData.append('kra_file', selectedKra);
      formData.append('id_number', idNumber);
      formData.append('kra_number', kraNumber);
      formData.append('phone_number', phoneNumber);

      fetch(`${process.env.REACT_APP_API_URL}/upload_kyc/${uid}`,{
        method: 'POST',
        body: formData
      })
      .then(response => {
        if(response.ok){
          if (location.pathname === '/app/wallet') {
            window.location.reload();
          }else{
            navigate("/app/wallet");
          }
        }else{
          toast.error('Server Error', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      })
      .catch(err=> {
        toast.error('Server Error', {
          position: "top-right",
          autoClose: 500,
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
    <div>
      <Header />
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-3/4 mx-auto">
            <div className="w-full">
              <h1 className="mb-4 text-md font-semibold text-gray-700 dark:text-gray-200">Submit the following documents to be able to proceed.</h1>
              <Label>
                <span>Phone Number (e.g +254712345678 - start with country code) </span>
                <Input onChange={e => setPhoneNumber(e.target.value)} className="mt-1 mb-4" type="text" placeholder="+254712345678" />
              </Label>

              <Label>
                <span>National ID Number</span>
                <Input onChange={e => setIDNumber(e.target.value)} className="mt-1 mb-4" type="number" placeholder="12345678" />
              </Label>

              <Label>
                <span className='mt-2 text-xs'>Upload PDF document of National ID, Both Front and Back side in it</span>
              </Label>
              <div className="flex items-center justify-center w-full mt-2 mb-4" onDrop={handleIDDrop} onDragOver={(e) => e.preventDefault()}>
                {selectedID ? (
                  <div className="flex gap-4 lg:gap-10 mt-5">
                      <div className=''>
                          <img src={require('../assets/img/pdf.png')} alt="PDF Logo" className="w-32 h-32 mr-2" />
                          <div className="text-sm mr-2 text-center mt-5 dark:text-white">{selectedID.name}</div>
                      </div>
                    
                    <button type="button" onClick={handleIDDelete}  className="w-8 h-8 fill-current bg-red-500 text-white cursor-pointer rounded-full">
                      X
                    </button>
                  </div>
                ) : (
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleIDChange} />
                  </label>
                )}
              </div>
                
              <Label>
                <span>KRA PIN</span>
                <Input onChange={e => setKraNumber(e.target.value)} className="mt-2 mb-4" placeholder="A00075995P" />
              </Label>

              <Label>
                <span className='mt-2 text-xs'>Upload PDF document of KRA PIN</span>
              </Label>
              <div className="flex items-center justify-center w-full mt-2" onDrop={handleKraDrop} onDragOver={(e) => e.preventDefault()}>
                {selectedKra ? (
                  <div className="flex gap-4 lg:gap-10 mt-5">
                      <div className=''>
                          <img src={require('../assets/img/pdf.png')} alt="PDF Logo" className="w-32 h-32 mr-2" />
                          <div className="text-sm mr-2 text-center mt-5 dark:text-white">{selectedKra.name}</div>
                      </div>
                    
                    <button type="button" onClick={handleKraDelete}  className="w-8 h-8 fill-current bg-red-500 text-white cursor-pointer rounded-full">
                      X
                    </button>
                  </div>
                ) : (
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleKraChange} />
                  </label>
                )}
              </div>

              <Button class="bg-green-600 p-2 rounded-lg text-sm text-white w-full mt-4 text-center" block
              onClick={() => handleSubmit()}
              >
                Submit Documents
              </Button>

            </div>
          </main>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Kyc