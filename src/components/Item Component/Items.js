import React, { useContext, useState } from 'react'
import Item from './Item'
import { AppContext } from '../../App';
import InifiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-bootstrap/Spinner';
import axsios from "axios"


export default function Items() {
    
    const {items, setItems} = useContext(AppContext)
    const [pageNum, setPageNum] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [dataSize, setDataSize] = useState(0)

    const getPage = async ()=>{
      try{
        // await new Promise ((x)=>{setTimeout(x,1000)})
        const response = await axsios.get(`http://127.0.0.1:8000/item-page/${pageNum}/${pageSize}`)
        console.assert(response.status === 200)
        const itemList = [...items]
        for(var i = 0; i < response.data.lst.length; i++){
          itemList.push(response.data.lst[i])
        }
        setItems([...itemList])
        setPageNum((prev)=>{return prev+1})
        setDataSize(response.data.size)
      }
      catch(error){
        console.log('ERROR:', error);
      }
    }
  
    return (
    <>
    <InifiniteScroll
    loadMore={getPage}
    hasMore={dataSize === 0 ? true : dataSize > items.length ? true : false}
    loader={
    <Spinner animation="border" role="status" key={0} 
    style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}>
    <span className="visually-hidden">Loading...</span>
    </Spinner>}
    >
    {items.map((item)=>{
        return <Item item={item} key={item.id}/>})}
    </InifiniteScroll>
    </>
  )
}
