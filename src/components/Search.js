import './Search.css'
import { useState,useEffect,useContext } from 'react'
import {CoinContext} from '../context/CoinContext'
export default function Search(){
    const {allcoins}=useContext(CoinContext)
    const [suggetions, setSugggetions]=useState([])
    const [search, setSearch]=useState('');
    const [show, setShow]=useState(false);

    function searchHandler(event){
        setSearch(event.target.value)
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
        setSugggetions(filtered.slice(0,10))

    }
    useEffect(()=>{ 
        if(search!=''){
            setShow(true)
            get_suggetions()
        } 
        else{
            setShow(false)
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
                    <input type='search' placeholder="Search crypto..." onChange={searchHandler}></input>
                    <button>Search</button>
                </div>
                
                <div className='suggest-dropdown'>{
                    show && (
                        suggetions.slice(0,5).map((coin)=>(<div className='suggest-Item'>{coin.name}</div>))
                    )
                    }
                    </div>
            </div>
        </div>
    )
}