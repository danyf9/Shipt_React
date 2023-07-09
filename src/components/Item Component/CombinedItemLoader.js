import React, { useContext, useState } from 'react'
import './ItemsLoaderStyle.css'
import { AppContext } from '../../App'
import ItemsLoader from './ItemsLoader'
import ItemFilter from './ItemFilter'

export default function CombinedItemLoader() {
    const [filter, setFilter] = useState(false)

    const [items, setItems] = useState([])
    const [pageNum, setPageNum] = useState(0)
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(10)
    const [dataSize, setDataSize] = useState(1)
    const [categories, setCategories] = useState([])
    const {API_URL} = useContext(AppContext)
  return (
    <>
    <div className='category-buttons'>
    <button className={!filter ? 'active': ''} onClick={()=>{setFilter(false)}}>Category</button>
    <button className={filter ? 'active' : ''} onClick={()=>{setFilter(true)}}>Filter</button>
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
