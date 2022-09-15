import React from 'react'
import './navigation.css'
import { useEffect, useState } from 'react'

export const Navigation = (props) => {
  let {walletCoins, setWalletCoins} = props
  

  const handleSignout = () => {
    sessionStorage.setItem('token', false)
    props.handleSignout(false)
  }
  return (
    <div>
        <button className="sign-out" onClick={handleSignout}>Sign Out</button>
    </div>
  )
}