import './NavBar.css'
import { useContext } from 'react'
import { CoinContext } from '../context/CoinContext'
export default function NavBar(){
    const {setCurrency,currency}=useContext(CoinContext)
    function changeHandler(event){
        setCurrency(event.target.value)
    }
    return(
        <div className='navbar'>
           <h1 className='nav-head'>CryptoPlace</h1>
            <div className='nav-links'>
                <a>Home</a>
                <a>Features</a>
                <a>Pricing</a>
                <a>Blog</a>
            </div>
            <div>
                <select name='currency' value={currency} onChange={changeHandler}>
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                </select>
                <button className="signup-button">Signup</button>
            </div>
        </div>
    )

}