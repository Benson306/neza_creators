import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import InfoCard from '../components/Cards/InfoCard'
import { Label, Input, Button } from '@windmill/react-ui'
import { AuthContext } from '../context/AuthContext'
import CTA from '../components/CTA'
import Kyc from './Kyc'

function Wallet() {
  const [amount, setAmount] = useState(0);

  const [status, setStatus] = useState(1);
  const { uid } = useContext(AuthContext);
  console.log(uid)

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

  }
  return (
    <div>
        <PageTitle>My Wallet</PageTitle>
        { status == 0 && <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <InfoCard title="Total Earnings" value={`KES. 400000`}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Withdrawal" value={`KES. 300000`}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Wallet Balance" value={`KES. 100000`}>
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
              
              <Label>
                <span className='font-semibold'>Enter Amount</span>
                <Input onChange={e =>  setAmount(e.target.value)} className="mt-1" type="number" placeholder="2300" />
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
    </div>
  )
}

export default Wallet