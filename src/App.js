import {Wallet} from "./Components/Wallet/Wallet";
import './app.css'
import Roulette from "./Components/Games/Roulette/Roulette";
import { Navigation } from "./Components/Navigation/Navigation";
import { Login } from "./Components/Login/Login";
import { useState, useEffect } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  console.log("yippie", loggedIn)
  return (
    <>
    {loggedIn === false ? <><Login handleLogin={setLoggedIn} /></> : <><Navigation handleSignout={setLoggedIn} /> <Wallet /></>}
    </>
  );
}

export default App;