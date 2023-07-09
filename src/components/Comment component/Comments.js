import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'
import Spinner from 'react-bootstrap/Spinner';
import InifiniteScroll from 'react-infinite-scroller'

export default function Comments() {

    const [comments, setComments] = useState([])
    const [pageNum, setPageNum] = useState(0)
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(10)
    const [dataSize, setDataSize] = useState(1)
    const {API_URL} = useContext(AppContext)

    const item = window.location.pathname.replace('/item/', '')
    const [rating, setRating] = useState(0)

    const [comment, setComment] = useState('')
    const [commentRating, setCommentRating] = useState('')

    const [commentSuccess, setCommentSuccess] = useState('')

    const getComments = async ()=>{
        try{
        const response = await axios.get(`${API_URL}/comments/${pageNum}/${pageSize}/${item}`)
        console.assert(response.status === 200)
        setComments([...comments, ...response.data.comments])
        setDataSize(response.data.size)
        setRating(response.data.rating)
        if(dataSize > comments.length){
            setPageNum((prev)=>{return prev+1})}
        }
        catch(error){
            console.log(error);
        }
    }

    const sendComment = async ()=>{
        try{
        const response = await axios.post(`${API_URL}/user-comment`,
        {headers: {'content-type': 'application/json'},
        data: {comment: comment, commentRating: commentRating, 
            Token: localStorage.getItem('token'), item: item}})
        console.assert(response.status === 200)
        setCommentSuccess(response.data)
        setCommentRating('')
        setComment('')
        if(response.data.color !== 'red'){
        setComments([...comments, 
            {comment_text: comment, rating: commentRating, 
                user: JSON.parse(localStorage.getItem('userInfo')).username,
                item: item.id}])}
    }
    catch(error){
        console.log(error);
    }
}

  return (
    <>
    <div style={{margin:'2rem 0rem 2rem 1rem'}}>
        <textarea style={{width: '30rem', height: '8rem', resize: 'none'}} 
        maxLength={100} onChange={(e)=>{setComment(e.target.value)}} value={comment}
        ></textarea><br/><br/>

        <input type='number' min={1} max={5} style={{width: '3rem'}} 
        onChange={(e)=>{setCommentRating(e.target.value)}} value={commentRating}/>⭐<br/>
        <button style={{marginTop: '1rem'}} onClick={()=>{sendComment()}}>comment</button>
        {commentSuccess !== '' &&
        <p style={{color: commentSuccess.color}}>{commentSuccess.msg}</p>
        }
    </div>

    

    <h5 style={{marginLeft: '1rem'}}>{parseFloat(rating).toFixed(2)}/5.00⭐</h5>
    <InifiniteScroll
    loadMore={getComments}
    hasMore={dataSize > comments.length}
    loader={
    <Spinner animation="border" role="status" key={0} 
    style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}>
    <span className="visually-hidden">Loading...</span>
    </Spinner>}
    style={{marginTop: '1rem', marginBottom: '1rem'}}
    >
    {(comments.length > 0 ) ?
    comments.map((comment, index)=>{
        return <div style={{marginBottom:'1rem',marginLeft: '1rem' , border: '0.1rem solid white', maxWidth: '66%'}} key={index}>
            <div style={{display:'flex', flexDirection:'row'}}>
                <p>{comment.user}</p>&nbsp;
                <p>{comment.rating}/5⭐</p>
            </div>
            <p style={{display:'inline'}}>{comment.comment_text}</p>
            </div>})
      : 'No comments found'
      }
    </InifiniteScroll>

    </>
  )
}
