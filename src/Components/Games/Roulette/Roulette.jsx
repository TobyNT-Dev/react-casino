import { ReactComponent as RouletteWheel } from '../Roulette/svg/the-r-wheel.svg'
import { ReactComponent as RouletteNeedle } from '../Roulette/svg/the-needle.svg'
import { useState, useEffect } from 'react'

//Style Imports
import './roulette.css'
export default function Roulette(props) {
    //Defining Variables
    const [rollNumber, setRollNumber] = useState(Math.floor(Math.random() * 361))
    const [ spinning, setSpinning ] = useState(false)
    const [ buttonActive, setButtonActive ] = useState(true)
    const [ addedNumber, setAddedNumber ] = useState(0)
    const [ result, setResult ] = useState("")
    //storages--------------------------------------------------------
    //main
    const [rouletteStorage, setRouletteStorage] = useState(0)
    //color Storages
    const [redStorage, setRedStorage] = useState(0)
    const [blackStorage, setBlackStorage] = useState(0)
    const [greenStorage, setGreenStorage] = useState(0)

    const [color, setColor] = useState("white")

    let {walletCoins, setWalletCoins} = props

    //Deposit +$50 to the Roulette Storage from wallet
    function rouletteAdd() {
        if (walletCoins >= 50) {
            console.log("50$ added to Bet")
            setWalletCoins(state => state - 50)
            setRouletteStorage(state => state + 50)
            setResult("")

            localStorage.setItem('walletAmount', JSON.stringify(walletCoins))
        }
        else {
            setResult("Insufficient funds")
        }
    }

    //Withdraw *all* Money from the Roulette Storage
    function rouletteSub() {
        if (rouletteStorage > 0) {
            setWalletCoins(state => state + rouletteStorage)
            setRouletteStorage(state => state - rouletteStorage)
            console.log("Bet Cleared.")

            setWalletCoins(parseInt(localStorage.getItem('walletAmount')))
        }
    }
    function rouletteSpin() {
        setSpinning(state => !state)
        setRollNumber(state => state = Math.floor(Math.random() * 361))
        setAddedNumber(state => state + rollNumber)
        setAddedNumber(state => state + 3600)

        setWalletCoins(parseInt(localStorage.getItem('walletAmount')))

        console.log("Game Started with Roll:", rollNumber)
        
        if ((rollNumber >= 12 && rollNumber <= 36) || (rollNumber >= 60 && rollNumber <= 84) || (rollNumber >= 108 && rollNumber <=132) || (rollNumber >= 156 && rollNumber <= 180) || (rollNumber >= 204 && rollNumber <= 228) || (rollNumber >= 252 && rollNumber <= 276) || (rollNumber >= 300 && rollNumber <= 324)) {
            if (blackStorage > 0) {
                setResult(`You Won: ${(blackStorage * 2) + (redStorage * 2) + (greenStorage * 15)}`)
            }
            else {
                setResult("You Lost...")
            }
            console.log("black!")
            setWalletCoins(state => state + (blackStorage * 2))
            setBlackStorage(0)
            setRedStorage(0)
            setGreenStorage(0)
            localStorage.setItem('walletAmount', JSON.stringify(walletCoins))
        }
        else if ((rollNumber >= 0 && rollNumber <= 12) || (rollNumber >= 348 && rollNumber <= 360)) { 
            if (greenStorage > 0) {
                setResult(`You Won: ${(blackStorage * 2) + (redStorage * 2) + (greenStorage * 15)}`)
            }
            else {
                setResult("You Lost...")
            }
            console.log("green!")
            setWalletCoins(state => state + (greenStorage * 15))
            setRedStorage(0)
            setBlackStorage(0)
            setGreenStorage(0)
            localStorage.setItem('walletAmount', JSON.stringify(walletCoins))
        }
        else if ((rollNumber >= 36 && rollNumber <= 60) || (rollNumber >= 84 && rollNumber <= 108) || (rollNumber >= 132 && rollNumber <= 156) || (rollNumber >= 180 && rollNumber <= 204) || (rollNumber >= 228 && rollNumber <= 252) || (rollNumber >= 276 && rollNumber <= 300) || (rollNumber >= 324 && rollNumber <= 348)) {
            if (redStorage > 0) {
                setResult(`You Won: ${(blackStorage * 2) + (redStorage * 2) + (greenStorage * 15)}`)
            }
            else {
                setResult("You Lost...")
            }
            console.log("red!")
            setWalletCoins(state => state + (redStorage * 2))
            setRedStorage(0)
            setBlackStorage(0)
            setGreenStorage(0)
            localStorage.setItem('walletAmount', JSON.stringify(walletCoins))
        }
    }
    function rouletteAddRed() {
        setRedStorage(state => state + rouletteStorage)
        setRouletteStorage(state => state - rouletteStorage)
        console.log(rouletteStorage + " added to Red!")
    }
    function rouletteAddBlack() {
        setBlackStorage(state => state + rouletteStorage)
        setRouletteStorage(state => state - rouletteStorage)
        console.log(rouletteStorage + " added to Black!")
    }
    function rouletteAddGreen() {
        setGreenStorage(state => state + rouletteStorage)
        setRouletteStorage(state => state - rouletteStorage)
        console.log(rouletteStorage + " added to Green!")
    }
    return( 
        <div className="roulette-container">
            <div>
            <RouletteNeedle className="needle" />
            <RouletteWheel className={spinning ? "r-wheel spinning": "r-wheel"} style={spinning ? { transform: `rotate(${addedNumber}deg)`, transition: "7000ms"} : {transform: `rotate(${addedNumber}deg)`, transition: "7000ms"}}/>
            </div>
            <div className="button-container">
                <button onClick={() => rouletteSpin()}>Spin</button>
                <button onClick={() => rouletteAdd()}>Deposit +$50</button>
                <button onClick={() => rouletteSub()}>Clear Bet</button>
                <h2>Current Bet Amount:</h2>
                <h2>${rouletteStorage}</h2>
                <h2 style={{color: `${color}`}}>{result}</h2>
                <button onClick={() => rouletteAddRed()}>Place Bet on Red</button>
                <button onClick={() => rouletteAddBlack()}>Place Bet on Black</button>
                <button onClick={() => rouletteAddGreen()}>Place Bet on Green</button>
                <h2>${redStorage}</h2>
                <h2>${blackStorage}</h2>
                <h2>${greenStorage}</h2>
            </div>
        </div>
    )
}
