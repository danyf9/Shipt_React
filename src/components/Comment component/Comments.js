import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import Spinner from 'react-bootstrap/Spinner';
import InifiniteScroll from 'react-infinite-scroller'

export default function Comments({item}) {

    const [comments, setComments] = useState([])
    const [pageNum, setPageNum] = useState(0)
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(10)
    const [dataSize, setDataSize] = useState(1)
    const {API_URL, username, userLogin} = useContext(AppContext)

    const [rating, setRating] = useState(0)

    const [comment, setComment] = useState('')
    const [commentRating, setCommentRating] = useState('')

    const [commentSuccess, setCommentSuccess] = useState('')
    const [canComment, setCanComment] = useState(true)
    const usernameSlash = username ? '/'+username : ''

    const getComments = async ()=>{
        if(item === undefined){return}
        try{
        const response = await axios.get(`${API_URL}/comments/${pageNum}/${pageSize}/${item}${usernameSlash}`)
        console.assert(response.status === 200)
        console.log(response.data);
        setComments([...comments, ...response.data.comments])
        setDataSize(response.data.size)
        setRating(response.data.rating)
        setCanComment(response.data.can_comment)
        if(dataSize > comments.length){
            setPageNum((prev)=>{return prev+1})}
        }
        catch(error){
            console.log(error);
        }
    }

    const sendComment = async ()=>{
        if(comment.length === 0){
            setCommentSuccess({color: 'red', msg: 'please enter a valid comment'})
            return
        }
        if(commentRating > 5 || commentRating < 0 || commentRating === ''){
            setCommentSuccess({color: 'red', msg: `Cannot enter '${commentRating}' rating`})
            return
        }
        try{
        const response = await axios.post(`${API_URL}/comments`,
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
                user: username, id:response.data.id,
                item: response.data.item}])
        setRating(response.data.rating)
            }
    }
    catch(error){
        console.log(error);
    }
}
    const deleteComment = async (id)=>{
        try{
        const response = await axios.delete(`${API_URL}/comments/${id}`)
        console.assert(response.status ===200)
        for(let i=0;i<comments.length;i++){
            if(comments[i].id === id){
                setComments((prev)=>{prev.splice(i, 1); return prev})
            }
        }
        setPageNum(0)
        getComments()
    }
    catch(error){
        console.log(error);
    }
}
    useEffect(()=>{
        setDataSize(1)
        setPageNum(0)
    },[])

  return (
    <>{rating >= 0 && rating <= 5  && item !== undefined && <>
    {userLogin && canComment?
    <div style={{margin:'2rem 0rem 2rem 0rem'}}>
        <textarea style={{width: '100%', height: '8rem', resize: 'none'}} 
        maxLength={100} onChange={(e)=>{setComment(e.target.value)}} value={comment}
        ></textarea><br/><br/>

        <input type='number' min={1} max={5} style={{width: '3rem'}} 
        onChange={(e)=>{setCommentRating(e.target.value)}} value={commentRating}/>⭐<br/>
        <button style={{marginTop: '1rem'}} onClick={()=>{sendComment()}}>comment</button>
        {commentSuccess !== '' &&
        <p style={{color: commentSuccess.color}}>{commentSuccess.msg}</p>
        }
    </div> : <br/>}

    {comments.length > 0 &&<>
    <h5 style={{marginLeft: '1rem'}}>{parseFloat(rating).toFixed(2)}/5.00⭐</h5>
    <br/></>}
    <h3>comments</h3>
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
            <div style={{display:'flex', flexDirection:'row', marginLeft: '1rem', marginTop: '0.5rem'}}>
                <p>{comment.user}</p>&nbsp;
                <p>{comment.rating}/5⭐</p>
            </div>
            <p style={{display:'inline', marginLeft: '1rem'}}>{comment.comment_text}</p><br/>
            {username === comment.user &&
            <button style={{marginLeft: '84%'}} onClick={()=>{deleteComment(comment.id)}}>delete</button>}
            </div>})
      : 'No comments found'
      }
    </InifiniteScroll></>}
    </>
  )
}
