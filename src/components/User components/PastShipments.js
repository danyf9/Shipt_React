import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'
import './PastShipmentsStyle.css'
import Spinner from 'react-bootstrap/Spinner';
import InifiniteScroll from 'react-infinite-scroller'

export default function PastShipments() {

  const {API_URL, dataSize, username, setDataSize} = useContext(AppContext)
  const [shipments, setShipments] = useState([])
  // eslint-disable-next-line
  const [pageNum, setPageNum] = useState(0)
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(10)

  const getShipments = async ()=>{
    try{
    const response = await axios.post(`${API_URL}/shipments/${pageNum}/${pageSize}`,
      {token: localStorage.getItem('token')})
      let len = [...shipments, ...response.data.lst].length
      if(len ===  response.data.size || len === response.data.size){setShipments([response.data.lst])}
      setShipments((prev)=>{return [...prev, ...response.data.lst]})
      setDataSize(response.data.size)
      if(dataSize > shipments.length){
        setPageNum((prev)=>{return prev+1})}
  }catch(error){
    console.log(error);
  }
}

  useEffect(()=>{
    setShipments([])
    getShipments()
    // eslint-disable-next-line
  },[])

  return (
    <>
    <div className='list'>
    <h3>Past shipments</h3>
    <InifiniteScroll
    loadMore={getShipments}
    hasMore={dataSize > shipments.length && username !== undefined}
    loader={
    <Spinner animation="border" role="status" key={0} 
    style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}>
    <span className="visually-hidden">Loading...</span>
    </Spinner>}
    style={{marginTop: '1rem'}}
    >
    {shipments.length 
    ? shipments.map((shipment, index)=>{
      return <div key={index}>
        <Link className='link' to={'/shipment/'+shipment.id}>{shipment.id} {shipment.order_date}</Link>
        </div>}) 
    : <div style={{textAlign: 'center'}}>
    <h4>No shipments found</h4>
    </div>}
    </InifiniteScroll>
    </div>
    </>
  )
}
