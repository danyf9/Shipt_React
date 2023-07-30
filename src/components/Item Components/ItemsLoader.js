import React, { useEffect, useState } from 'react'
import axios from "axios"
import './ItemsLoaderStyle.css'
import ItemBox from './ItemBox'
import InifiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-bootstrap/Spinner';


export default function ItemsLoader({items, setItems, pageNum, setPageNum, pageSize, 
  setPageSize, dataSize, setDataSize, categories, setCategories, API_URL}) {
    
    const [category, setCategory] = useState('/All')

    const getPage = async ()=>{
      try{
        const response = await axios.get(`${API_URL}/item-page/${pageNum}/${pageSize}${category}`)
        console.assert(response.status === 200)
        setItems([...items,...response.data.lst])
        setDataSize(response.data.size)
        setCategories(response.data.categories)
        if(dataSize > items.length){
        setPageNum((prev)=>{return prev+1})}
      }
      catch(error){
        console.log('ERROR:', error);
      }
    }

    useEffect(()=>{
      setPageNum(0);
      setDataSize(1)
      setItems([])
      // eslint-disable-next-line
    },[category])

    return (
    <>
    <div className='category-buttons'>
      <button className={category==='/All' ? 'active' : ''} onClick={()=>{setCategory('/All')}}>All</button>
      {categories ? categories.map((c)=>{
        return <button key={c} onClick={()=>{setCategory('/'+c)}} className={'/'+c === category ? 'active' : ''}>{c}</button>
      }): ''}
    </div>
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
        return <ItemBox item={item} key={item.id}/>})
      : 'No items found'
      }
    </InifiniteScroll>
    </>
  )
}
