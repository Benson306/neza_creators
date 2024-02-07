import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import InfoCard from '../components/Cards/InfoCard'
import { Label, Input, Button } from '@windmill/react-ui'
import { AuthContext } from '../context/AuthContext'
import CTA from '../components/CTA'
import Kyc from './Kyc'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';
import { Checkmark } from 'react-checkmark'

function Wallet() {
  const [amount, setAmount] = useState(0);
  const [password, setPassword] = useState(null);

  const [status, setStatus] = useState(1);
  const { uid } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/get_verification/${uid}`)
    .then(response => {
      response.json().then((res)=>{
        setStatus(res.status)
      })
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  const handleWithdraw = () => {

    if(amount < 50){
      toast.error('Invalid Amount', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }
    
    if(password == null){
      toast.error('Invalid Amount', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/withdraw`,{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        creator_id : uid,
        password,
        amount
      })
    })
    .then((response)=> {
      if(response.ok){
        openModal();
        setAmount(0)
        setPassword(null);
      }else{
        response.json().then((res)=>{
          console.log(res)
          if(res == "failed"){
            toast.error('Server Error', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          }else if(res == "invalid amount"){
            toast.error('Insufficient Balance', {
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
            toast.error('Authentication Failed', {
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
      }
    })

  }

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/creator_payouts/${uid}`)
    .then( response => response.json())
    .then(response => {
      setData(response);
      setLoading(false);
    })
    .catch(err => {
      setError(true);
      setLoading(false);
    })
  },[])

  const [balance, setBalance] = useState(0);
  const [withdrawals, setWithdrawals]  = useState(0);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/get_creator/${uid}`)
    .then( response => response.json())
    .then(response => {
      setWithdrawals(response.totalWithdrawal);
      setBalance(response.balance);
    })
    .catch(err => {
      console.log(err)
    })
  })

  useEffect(()=>{
    const calculatedTotal = data.reduce((acc, item) => acc + Number(item.amount), 0);
    setTotal(calculatedTotal)
  },[data])

  return (
    <div>
      <ToastContainer />
        <PageTitle>My Wallet</PageTitle>
        { status == 0 && <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <InfoCard title="Total Earnings" value={`KES. ${total}`}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Withdrawal" value={`KES. ${withdrawals}`}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Wallet Balance" value={`KES. ${balance}`}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-600 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-600"
            className="mr-4"
          />
        </InfoCard>
        </div> }

        {
          status == 2 && <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
            <InfoCard title="Total Earnings" value={`KES. 400000`}>
              <RoundIcon
                icon={PeopleIcon}
                iconColorClass="text-orange-500 dark:text-orange-100"
                bgColorClass="bg-orange-100 dark:bg-orange-500"
                className="mr-4"
              />
            </InfoCard>
          </div>
        }

        { status == 0 ? <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-3/4 mx-auto">
            <div className="w-full">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">Withdraw Cash</h1>
              
              <Label className="mb-5">
                <span className='font-semibold'>Enter Amount</span>
                <Input onChange={e =>  setAmount(e.target.value)} className="mt-1" type="number" placeholder="2300" />
              </Label>

              <Label>
                <span className='font-semibold'>Enter Password</span>
                <Input onChange={e =>  setPassword(e.target.value)} className="mt-1" type="password" placeholder="*******" />
              </Label>
              
              <div className='flex justify-center'>
                <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full lg:w-1/2  mt-4 text-center" block
                onClick={() => handleWithdraw()}
                >
                  Withdraw Cash
                </Button>
              </div>
              
            </div>
          </main>
        </div>
      </div> :
      status == 1 ? 
      <div>
        <CTA 
        text={"Verification of documents has been rejected. To re-apply fill the form below:"} 
        background={"bg-red-600"}
        color={"text-white"}
        />
        <Kyc />
      </div> 
      :
      <div>
        <CTA 
        text={"Account verification is pending. Verification is done within 24 hours"}
        background={"bg-blue-600"}
        color={"text-white"}/>
      </div> 
      }

    <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody>
          <div className="flex justify-center my-1">
              <Checkmark size='xxLarge' />
          </div>
          <div className='text-center mt-5 text-lg'>Withdrawal has been succesful</div>
        </ModalBody>
      </Modal>

    </div>
  )
}

export default Wallet