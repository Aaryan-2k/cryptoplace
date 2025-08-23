import './Search.css'
import { useState,useEffect,useContext } from 'react'
import {CoinContext} from '../context/CoinContext'
import { useNavigate } from 'react-router-dom'
export default function Search(){
    const navigate=useNavigate()
    const {allcoins,fetchCoinsData}=useContext(CoinContext)
    const [suggetions, setSugggetions]=useState([])
    const [search, setSearch]=useState('');

    function searchHandler(event){
        setSearch(event.target.value)
    }
    
  
    function searchButtonHandler(){
        setSugggetions([])
        const coinIds=suggetions.map(coin=>coin.id)
        fetchCoinsData(coinIds);
    }
    function get_suggetions(){
        let lowerCaseSearchTerm=search.toLowerCase()
        const filtered = allcoins.filter(coin =>coin.name.toLowerCase().includes(lowerCaseSearchTerm))
        filtered.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aStartsWith = aName.startsWith(lowerCaseSearchTerm);
            const bStartsWith = bName.startsWith(lowerCaseSearchTerm);
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return aName.length - bName.length;
        });
        setSugggetions(filtered)
        console.log(filtered)

    }
    useEffect(()=>{
        if(search!=''){
        get_suggetions()
        }
    },[search])

    return(
        <div className='main-container'>
            <div className='main-head'>
                <h1>Largest Crypto Marketplace</h1>
                <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
            </div>
            <div className='search-wrapper'>
                <div className="search-container">
                    <input type='search' placeholder="Search crypto..." onChange={searchHandler} value={search}></input>
                    <button onClick={searchButtonHandler}>Search</button>
                </div>
                <div className='suggest-dropdown'>{
                        suggetions.slice(0,5).map((coin)=>(<div onClick={()=>navigate(`coin/${coin.id}`)} className='suggest-Item'>{coin.name}</div>))
                    }
                    </div>
            </div>
        </div>
    )
}