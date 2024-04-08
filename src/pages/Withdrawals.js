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

function Withdrawals() {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading] = useState(true);
    const [ error, setError ] = useState(false);
    const [total, setTotal] = useState(0);

    const { uid } = useContext(AuthContext);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/withdrawals/${uid}`)
        .then( response => response.json())
        .then(response => {
            console.log(response)
          setData(response);
          setLoading(false);
        })
        .catch(err => {
          setError(true);
          setLoading(false);
        })
    },[])

    const [ phoneNumber, setPhoneNumber ] = useState(null);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/get_creator_phone_number/${uid}`)
    .then(response => {
      return response.json();
    })
    .then(( response )=>{
      setPhoneNumber(response);
    })
    .catch(err => {
      console.log(err);
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

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell >Phone Number</TableCell>
              <TableCell >Amount</TableCell>
              <TableCell >Date</TableCell>
              <TableCell >Status</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              !loading && !error && dataTable1.slice().reverse().map( (item, i) => (
              <TableRow key={i}>
                <TableCell>
                    <p className="font-semibold">{phoneNumber}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">MPESA</p>
                </TableCell>
                <TableCell>
                    <span className="text-sm capitalize">{item.currency} {item.amount}</span>
                </TableCell>
                <TableCell>
                    <span className="text-sm capitalize">{item.date}</span>
                </TableCell>
                <TableCell>
                    {
                        item.status.split(".")[1] == "failed" ?
                            <div className="text-xs w-full lg:w-1/2 capitalize bg-red-600 rounded-lg p-1 text-center text-white">Failed</div> 
                        : 
                        item.status.split(".")[1] == "success" ? 
                            <div className="text-xs w-full lg:w-1/2 capitalize bg-green-600 rounded-lg p-1 text-center text-white">Success</div> 
                        :
                            <div className="text-xs w-full lg:w-1/2 capitalize bg-gray-600 rounded-lg p-1 text-center text-white">Queued</div> 
                    }
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

export default Withdrawals