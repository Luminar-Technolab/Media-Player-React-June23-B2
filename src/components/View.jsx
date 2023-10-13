import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { Col, Row } from 'react-bootstrap'
import { getAllVideos } from '../services/allAPI';

function View({serverResponse}) {

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
  return (
    <>
    <Row>
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