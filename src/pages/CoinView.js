import CoinInfo from '../components/CoinInfo'
import CoinChart from '../components/CoinChart'
export default function CoinView(){
    return (
        <div className='coin-cointainer'>
            <CoinInfo></CoinInfo>
            <CoinChart></CoinChart>
        </div>
    )
}