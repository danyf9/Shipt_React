import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { AppContext } from '../../App'
import ItemBox from './ItemBox'
import { Spinner } from 'react-bootstrap'
import InifiniteScroll from 'react-infinite-scroller'
import axios from 'axios'

export default function SearchItem() {

    const {search, items, setItems, dataSize, setDataSize} = useContext(AppContext)
    // setSearch('Bag')
    const [pageNum, setPageNum] = useState(1)
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(10)
    const {API_URL, setSearch} = useContext(AppContext)

    const getPage = async ()=>{
        try{
          const response = await axios.post(`${API_URL}/item-search/${pageNum}/${pageSize}`,
          {headers: {'content-type': 'application/json'},
          param: search
        }
          )
          console.assert(response.status === 200)
          setItems([...items,...response.data.lst])
          setDataSize(response.data.size)
          if(dataSize > items.length){
          setPageNum((prev)=>{return prev+1})}
        }
        catch(error){
          console.log('ERROR:', error);
        }
      }

      useEffect(()=>{
        // eslint-disable-next-line
        return ()=>{setItems([]); setSearch('')}} ,[])
  
return (
    <>
    {search ? <>
    <h3>You searched for {search}</h3>
    <InifiniteScroll
    loadMore={getPage}
    hasMore={dataSize > items.length}
    loader={
    <Spinner animation="border" role="status" key={0} 
    style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}>
    <span className="visually-hidden">Loading...</span>
    </Spinner>}
    style={{marginTop: '1rem'}}
    >
    {(items.length > 0 ) ?
    items.map((item)=>{
        return <ItemBox item={item} key={item.id} style={{width: '15%'}}/>})
      : 'No items found'
      }
    </InifiniteScroll></>
    : ''}
    </>
  )
}
