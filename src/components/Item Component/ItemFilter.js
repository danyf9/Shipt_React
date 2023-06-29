import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import './ItemsLoaderStyle.css'
import ItemBox from './ItemBox'
import InifiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-bootstrap/Spinner';
import { AppContext } from '../../App'

export default function ItemFilter() {

    const [items, setItems] = useState([])
    const [pageNum, setPageNum] = useState(0)
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(10)
    const [dataSize, setDataSize] = useState(1)
    const [categories, setCategories] = useState([])
    const {API_URL} = useContext(AppContext)

    const [category, setCategory] = useState([])
    const [price, setPrice] = useState(0)    
    const [priceType, setPriceType] = useState('=')
    const [name, setName] = useState('')

    const getPage = async ()=>{
        try{
          const response = await axios.post(`${API_URL}/item-filter/${pageNum}/${pageSize}`,
          {headers: {'content-type': 'application/json'},
          filters: {category: category, price:price, priceType:priceType, name: name}
        }
          )
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
        if(price===''){
          setPrice(0)
        }
        ;
      },[category, price, priceType, name])
  return (
    <>
    <div
    style={{backgroundColor: 'darkblue'}}
    >
        <h6>filter</h6>
        <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-around'}}>
          <div>
          <label htmlFor='name'>Name: </label>
        <input onChange={(e)=>{setName(e.target.value)}} id='name'/>
          </div>
          <div>
          <label htmlFor='price'>Price:</label>
        <input type='number' min={0} onChange={(e)=>{setPrice(e.target.value)}} id='price' value={price}/>
          </div>
          <div>
            {categories.map((c, index)=>{
              return <div key={index} style={{}}>
                <label htmlFor={c}>{c}</label>
                <input type='checkbox' id={c}
                onClick={()=>{
                  if(category.includes(c)){
                    setCategory((prev)=>{
                      prev.splice(prev.indexOf(c))
                      return prev
                    })
                  }
                  else{
                  setCategory((prev)=>{return [...prev, c]})}}
                }
                />
                </div>
            })}
          </div>
        </div>

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
    <button onClick={()=>{console.log(category);}}>
      abc
    </button>
    </>
  )
}
