import React from 'react'
import AuthImage from '../assets/authImage.png'
import FirebaseAuth from '../components/auth/FirebaseAuth'

const Auth = () => {
  return (
    <div className='w-screen grid grid-cols-2'>
      <div>
        <div className='font-bold'>
          Welcome to ThoughtScape
        </div>
        <div>
          Note any of your ideas
        </div>
      </div>
      <FirebaseAuth />
      <div>
        <img src={AuthImage} alt="" />
      </div>
    </div>
  )
}

export default Auth