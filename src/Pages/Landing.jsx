import React from 'react'
import { useNavigate } from 'react-router'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div>
      hello
      <button onClick={() => navigate('/auth')}>Go to auth</button>
    </div>
  )
}

export default Landing