import React, { useContext, useEffect, useState } from 'react'
import './ItemsLoaderStyle.css'
import { AppContext } from '../../App'
import ItemsLoader from './ItemsLoader'
import ItemFilter from './ItemFilter'

export default function CombinedItemLoader() {
    const [filter, setFilter] = useState(false)

    const [pageNum, setPageNum] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [categories, setCategories] = useState([])
    const {API_URL, items, setItems, dataSize, setDataSize} = useContext(AppContext)
    useEffect(()=>{
      setDataSize(1)
      setPageNum(0)
      // eslint-disable-next-line
    },[])
  return (
    <>
    <div className='category-buttons'>
    <button className={!filter ? 'active': ''} onClick={()=>{setFilter(false); setItems([]); setPageNum(0)}}>Category</button>
    <button className={filter ? 'active' : ''} onClick={()=>{setFilter(true); setItems([]); setPageNum(0)}}>Filter</button>
    </div>
    <br/>
    {!filter ? 
     <ItemsLoader 
    items={items} setItems={setItems} pageNum={pageNum} setPageNum={setPageNum} pageSize={pageSize}
    setPageSize={setPageSize} dataSize={dataSize} setDataSize={setDataSize} 
    categories={categories} setCategories={setCategories} API_URL={API_URL}/>
    : <ItemFilter
    items={items} setItems={setItems} pageNum={pageNum} setPageNum={setPageNum} pageSize={pageSize}
    setPageSize={setPageSize} dataSize={dataSize} setDataSize={setDataSize} 
    categories={categories} setCategories={setCategories} API_URL={API_URL}/>}
    </>
  )
}
