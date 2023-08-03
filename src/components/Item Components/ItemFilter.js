import React, { useState } from 'react'
import axios from "axios"
import './ItemsLoaderStyle.css'
import ItemBox from './ItemBox'
import InifiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-bootstrap/Spinner';

export default function ItemFilter({items, setItems, pageNum, setPageNum, pageSize, 
  setPageSize, dataSize, setDataSize, categories, setCategories, API_URL}) {

    const [category, setCategory] = useState([])
    const [price, setPrice] = useState(0)    
        // eslint-disable-next-line
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
                onChange={()=>{
                  if(category.includes(c)){
                    setCategory((prev)=>{
                      prev.splice(prev.indexOf(c),1)
                      return prev
                    })
                  }
                  else{
                  setCategory((prev)=>{return [...prev, c]})}
                }
                }
                />
                </div>
            })}
          </div>
        </div>
        <button
        onClick={()=>{setPageNum(0);
        setDataSize(1)
        setItems([])
        if(price===''){
          setPrice(0)
        }}}
        style={{marginLeft: '1rem', marginBottom: '1rem', padding: '1rem 2rem'}}
        >Filter</button>

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
        return <ItemBox item={item} key={item.id} style={{width: '15%'}}/>})
      : 'No items found'
      }
    </InifiniteScroll>
    </>
  )
}
