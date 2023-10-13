import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { Col, Row } from 'react-bootstrap'
import { getAllCategory, getAllVideos, updateCategory } from '../services/allAPI';

function View({serverResponse,setDragRes}) {

  const [deleteStatus,setDeleteStatus] = useState(false)
  const [allVideos,setAllVideos] = useState([])
  const getAllUploadedVideos =  async ()=>{
    //make api call getAllVideos
    const {data} = await getAllVideos()
    setAllVideos(data);
  }

  useEffect(()=>{
    getAllUploadedVideos()
    setDeleteStatus(false)
  },[serverResponse,deleteStatus])
  // console.log(allVideos);
  const dragOver = (e)=>{
    e.preventDefault()
  }

  const videoDropped = async (e)=>{
    const {categoryId,videoId} = JSON.parse(e.dataTransfer.getData("dataShare"))
    console.log(categoryId,videoId);
    const {data} = await getAllCategory()
    const selectedCategory = data.find(item=>item.id==categoryId)
    let result = selectedCategory.allVideos.filter((video,index)=>video.id!=videoId)
    // let index = selectedCategory.allVideos.indexOf(result)
    // selectedCategory.allVideos.splice(index,1)
    const {id,categoryName} = selectedCategory
    let newCategory ={
      id,categoryName,allVideos:result
    }
    console.log(newCategory);
    const res = await updateCategory(categoryId,newCategory)
    setDragRes(res)
  }
  return (
    <>
    <Row droppable onDragOver={e=>dragOver(e)} onDrop={e=>videoDropped(e)}>
      {
        allVideos.length>0?
        allVideos.map(video=>(
          <Col sm={12} md={6} lg={4} xl={3} >
          <VideoCard displayData={video} setDeleteStatus={setDeleteStatus} />
         </Col>
        ))
        : 
        <p className='fw-bolder fs-5 text-danger'>Nothing to display!!!</p>
        }
    </Row>
    </>
  )
}

export default View