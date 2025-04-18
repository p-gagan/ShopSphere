import React from 'react'
import { useParams } from 'react-router-dom'

const Categories = () => {
    const params = useParams();
    
  return (
    <div>{params.category}</div>
  )
}

export default Categories