import {createContext,useState,useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const api_key=process.env.REACT_APP_CRYPTO_KEY
const option={
                method:'GET',
                headers:{
                accept:'application/json','x_cg_demo_api_key':api_key
                }
            }


export const CoinContext=createContext();

export default function CoinContextProvider({children}){
    const pathname=useLocation().pathname
    const [coins,setCoins]=useState([]);
    const [page, setPage]=useState(1);
    const [allcoins, setAllCoins]=useState([]);
    const [currency, setCurrency]=useState('USD')

    async function fetchCoinsData(){
        let url=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=10&page=1`
        console.log(url)
        try{
            let data=await fetch(url,option)
            data=await data.json()
            console.log(data)
            setCoins(data);
        }
        catch{
            setCoins([]);
            console.log('enerror accured in cryptop api');
        }
    }
    const value={
        allcoins,
        currency,
        setCurrency,
        fetchCoinsData,
        coins,
    }

    async function fetchAllCoins(){
        let link=`https://api.coingecko.com/api/v3/coins/list`
        try{
            let data=await fetch(link,option)
            data=await data.json()
            setAllCoins(data);
        }
        catch{
            console.log('error in fetching all coins');
        }
    }

useMemo(()=>{
    if (!pathname.includes('coin')){
    
    fetchCoinsData();
    }
},[pathname,currency]);

useMemo(()=>{
    if (!pathname.includes('coin')){

        fetchAllCoins()
    }
},[pathname]);

return(
    <CoinContext.Provider value={value}>
        {children}
    </CoinContext.Provider>
)
}