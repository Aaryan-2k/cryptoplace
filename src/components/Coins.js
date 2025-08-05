import './Coins.css'
import { useContext } from 'react'
import {CoinContext} from '../context/CoinContext'

export default function Coins(){
    const {coins,currency}=useContext(CoinContext)
    
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
    return(
        <table>
            <thead>
                <tr className="table-head">
                    <th>#</th>
                    <th>Coins</th>
                    <th>Price</th>
                    <th>24H Change</th>
                    <th>Market Cap.</th>
                </tr>
            </thead>
            <tbody>
                    {
                        coins.map((coin,index)=>(
                            <tr>
                            <td>{index+1}</td>
                            <td className='coin-name'><img src={coin.image} height='35'></img>{coin.name}</td>
                            <td>{formatNumber(coin.current_price)}</td>
                            <td className={parseFloat(coin.price_change_24h)<0 ? 'neg': parseFloat(coin.price_change_24h)>0 ? 'pos' : 'nothing' }>{formatNumber(coin.price_change_24h,2)}</td>
                            <td>{formatNumber(coin.market_cap,0)}</td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
    )
}