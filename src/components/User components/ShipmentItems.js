import React, { useContext, useEffect, useState } from 'react'
import InifiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import './ShipmentItemsStyle.css'

export default function ShipmentItems() {

    const {API_URL,items,setItems} = useContext(AppContext)
    const shipment = window.location.pathname.replace('/shipment/', '')
    const [pageNum, setPageNum] = useState(0)
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(10)
    const [dataSize, setDataSize] = useState(1)
    const [visItems, setVisItems] = useState([])
    const [sum, setSum] = useState(0)

    const getItems = async ()=>{
        try{
        const response = await axios.post(`${API_URL}/shipments-items/${pageNum}/${pageSize}`,
        {shipment: shipment})
        console.assert(response.status === 200)
        setItems([...items,...response.data.lst])
        setDataSize(response.data.size)
        if(dataSize > items.length){
        setPageNum((prev)=>{return prev+1})}
    }catch(error){
        console.log(error);
    }
}
const  itemsView = ()=>{
    let counts = {}
    setSum(0)
    if (items.length){
    for(let i=0; i<items.length; i++){
        if(counts[JSON.stringify(items[i])] === undefined){
        counts[JSON.stringify(items[i])] = 1
    }else{counts[JSON.stringify(items[i])] = counts[JSON.stringify(items[i])] + 1}
    setSum((prev)=>{return prev+items[i].price})    
}
    }
    return counts
}


    useEffect(()=>{
        getItems()
    // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(items.length){
            setVisItems(Object.entries(itemsView()))}
    // eslint-disable-next-line
    },[items])


  return (
    <><div className='list' >
    <InifiniteScroll
    loadMore={getItems}
    hasMore={dataSize > items.length}
    loader={
    <Spinner animation="border" role="status" key={0} 
    style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}>
    <span className="visually-hidden">Loading...</span>
    </Spinner>}
    style={{marginTop: '1rem'}}
    >
    {visItems.length > 0 ? <>
    <h3>Shipment {shipment}</h3>
    {visItems.map((count, index)=>{
        return<div key={index}><Link className='link' to={'/item/'+JSON.parse(count[0]).id}>
            {JSON.parse(count[0]).id}&nbsp;
            {JSON.parse(count[0]).name}&nbsp;
            {JSON.parse(count[0]).price}$ * {count[1]}
            </Link></div>
            })}total of {sum}$</>
      :
      'No items found'
      }
    </InifiniteScroll>
    </div>
    <button onClick={()=>{console.log(visItems);}}>abc</button>
    </>
  )
}
