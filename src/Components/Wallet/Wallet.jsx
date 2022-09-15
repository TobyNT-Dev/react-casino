import { clear } from '@testing-library/user-event/dist/clear'
import React from 'react'
//Script related import(s)
import { useState, useEffect } from 'react'
import Roulette from '../Games/Roulette/Roulette'

//styles import
import './wallet.css'


 export const Wallet = () => {
    const [ walletCoins, setWalletCoins ] = useState(0)

    //Click printer Amount Variable
    let ClickAmount = 5
    
    //print button click function
    function earnCoins() {
        setWalletCoins(walletCoins + ClickAmount)
        // localStorage.setItem('walletAmount', walletCoins)
        //Other Try:
        localStorage.setItem('walletAmount', JSON.stringify(walletCoins + 5))
    }
    useEffect(() => {
      if (walletCoins > 0) {
        setWalletCoins(0)
      }
      else {
        setWalletCoins(parseInt(localStorage.getItem('walletAmount')))
      }
    },[])
    return (
        <>
        <h2 className="wallet" id="wallet">{`$${walletCoins}`}</h2>
        <div className="wallet-box">
        <button onClick={() => earnCoins()} className="print-button">$ Print Money $</button>
        </div>
        <Roulette walletCoins={walletCoins} setWalletCoins={setWalletCoins}/>
    </>
  )
}
