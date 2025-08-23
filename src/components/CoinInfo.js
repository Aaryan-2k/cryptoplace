import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { CoinContext } from "../context/CoinContext"

const api_key=process.env.REACT_APP_CRYPTO_KEY
const option={
                method:'GET',
                headers:{
                accept:'application/json','x_cg_demo_api_key':api_key
                }
            }

export default function CoinInfo(){
const {currency}=useContext(CoinContext)
const [loading,setLoading]=useState(false)
const {coinid}=useParams()
const [coin, setCoinInfo]=useState([])
const formatNumber = (number, maximumFractionDigits = 3) => {
    if (number === null || number === undefined || isNaN(number)) {
      return 'N/A';
    }
    const locale = currency === 'INR' ? 'en-IN' : 'en-US';
    return Number(number).toLocaleString(locale, {
      maximumFractionDigits: maximumFractionDigits,
      style: 'currency',
      currency: currency.toUpperCase(), // Ensure currency code is uppercase
    });
  };
    async function fetchCoin(){
        setLoading(true)
        let url=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinid}`
        console.log(url)
        try{
            let data=await fetch(url,option)
            data=await data.json()
            console.log(data)
            setCoinInfo(data);
        }
        catch{
            console.log('enerror accured in cryptop api');
        }    
        setLoading(false)
    }
useEffect(()=>{
    setCoinInfo([])
    fetchCoin()
},[currency])

    return (
        loading ? 
        
        (<div className="info-container"><span class="loader"></span></div>) :
        coin.length==0 ? (
            <div className="info-container">
            <span className='head'><img src='' height='40'></img><b></b>API Limit Reached</span>
            <p className='price'>NaN</p>
            <div className="info"><span>Market Cap :</span><span><b>NaN</b></span></div>
            <div className="info"><span>Fully Diluted Valuation :</span><span><b>NaN</b></span></div>
            <div className="info"><span>24 Hour Trading Vol :</span><span><b>NaN</b></span></div>
            <div className="info"><span>Circulating Supply :</span><span><b>NaN</b></span></div>
            <div className="info"><span>Total Supply :</span><span><b>NaN</b></span></div>
            <div className="info"><span>Max Supply :</span><span><b>NaN</b></span></div>
            <div className="info"><span>All Time High :</span><span><b>NaN</b></span></div>
            <div className="info"><span>24h High :</span><span><b>NaN</b></span></div>
            <div className="info"><span>24h Low :</span><span><b>NaN</b></span></div>
            <div className="info"><span>24h Change :</span><span><b>NaN</b></span></div>
            <div className="info"><span>Last Updated at :</span><span><b>NaN</b></span></div>
        </div>
        ) :
        <div className="info-container">
            <span className='head'><img src={coin[0].image} height='40'></img><b>{coin[0].name}</b></span>
            <p className='price'>{formatNumber(coin[0].current_price)}</p>
            <div className="info"><span>Market Cap :</span><span><b>{formatNumber(coin[0].market_cap)}</b></span></div>
            <div className="info"><span>Fully Diluted Valuation :</span><span><b>{formatNumber(coin[0].fully_diluted_valuation)}</b></span></div>
            <div className="info"><span>24 Hour Trading Vol :</span><span><b>{coin[0].total_volume}</b></span></div>
            <div className="info"><span>Circulating Supply :</span><span><b>{coin[0].circulating_supply}</b></span></div>
            <div className="info"><span>Total Supply :</span><span><b>{coin[0].total_supply}</b></span></div>
            <div className="info"><span>Max Supply :</span><span><b>{coin[0].max_supply}</b></span></div>
            <div className="info"><span>All Time High :</span><span><b>{formatNumber(coin[0].ath)}</b></span></div>
            <div className="info"><span>24h High :</span><span><b>{formatNumber(coin[0].high_24h)}</b></span></div>
            <div className="info"><span>24h Low :</span><span><b>{formatNumber(coin[0].low_24h)}</b></span></div>
            <div className="info"><span>24h Change :</span><span><b>{coin[0].price_change_24h}</b></span></div>
            <div className="info"><span>Last Updated at :</span><span><b>{coin[0].last_updated}</b></span></div>
        </div>
    )
}