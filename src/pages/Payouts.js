import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination
} from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'

function Payouts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  const { uid } = useContext(AuthContext);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/creator_payouts/${uid}`)
    .then( response => response.json())
    .then(response => {
      console.log(response);
      setData(response);
      setLoading(false);
    })
    .catch(err => {
      setError(true);
      setLoading(false);
    })
  },[])

  useEffect(()=>{
    const calculatedTotal = data.reduce((acc, item) => acc + Number(item.amount), 0);
    setTotal(calculatedTotal)
  },[data])

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])

  // pagination setup
  const resultsPerPage = 5
  const totalResults = data.length;

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(data.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1, data])

  return (
    <div className='w-full mx-auto'>
      <PageTitle>Recent Transactions</PageTitle>

      { !loading && data.length > 0 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
        Total Earning: <span className='font-semibold ml-2'>{data[0].currency}. {total}</span>
      </div> }
      { !loading && data.length < 1 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
        You Have Received No Earning
      </div> }
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell >Brand Name/Email</TableCell>
              <TableCell >Description</TableCell>
              <TableCell >Country</TableCell>
              <TableCell >Amount</TableCell>
              <TableCell >Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              !loading && !error && dataTable1.slice().reverse().map( (item, i) => (
              <TableRow key={i}>
                <TableCell>
                      <p className="font-semibold">{item.companyName}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.sender_email}</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.description}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.country}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.currency} {item.amount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.date}</span>
                </TableCell>
              </TableRow>
              ) )
            }
            {
              loading && 
              <TableCell>
                <span>Loading.......</span>
              </TableCell>
            }
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

    
    </div>
  )
}

export default Payouts