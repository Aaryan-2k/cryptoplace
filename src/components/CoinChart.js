import { useRef,useEffect,useState,useContext } from "react"
import { ColorType, createChart,AreaSeries } from "lightweight-charts"
import { CoinContext } from "../context/CoinContext"
import { useParams } from "react-router-dom"
const api_key=process.env.REACT_APP_CRYPTO_KEY
const option={
                method:'GET',
                headers:{
                accept:'application/json','x_cg_demo_api_key':api_key
                }
            }
export default function CoinChart(){
    const {currency}=useContext(CoinContext)
    const {coinid}=useParams()
    const [data, setData]=useState([]);
    const chartRef=useRef();
    const [loading, setLoading] =useState(false)
    async function fetchData(){
        setLoading(true)
        let url=`https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency}&days=180&interval=daily`
        try{
            let output=await fetch(url,option)
            output=await output.json()
            output=output.prices.map(([time,val])=>{
                return {time:Math.floor(time/1000),
                    value:val}
                })
            console.log(output)
            setData(output)
        }
        catch{
            console.log('failed to fetch historic data');
        }
        setLoading(false)
    }
   const calculatePercentageChange = (days) => {
        if (data.length > days) {
            const lastValue = data[data.length - 1].value;
            const previousValue = data[data.length - 1 - days].value;
            const change = ((lastValue - previousValue) / previousValue) * 100;
            return change.toFixed(2);
        }
        return 'N/A';
    };

    useEffect(()=>{
        const chart=createChart(chartRef.current,{
            layout:{
                background:{type:ColorType.Solid, color:'rgba(0,0,0,0.35)'},
                textColor:'white',
            },
            
            width:950,
            height:450,
            timeScale: {
                borderColor: 'transparent',
                axisLabelVisible: false, 
                tickMarkVisible: false,  
            },
            grid: {
            vertLines: {
                color: 'transparent',
            },
            horzLines: {
                color: 'transparent',
            },
        },
        })
        const newSeries = chart.addSeries(AreaSeries,{
    lineColor: '#8000FF',
    topColor: 'rgba(128, 0, 255, 0.6)',
    bottomColor: 'rgba(128, 0, 255, 0)',
});
        newSeries.setData(data)

        return () => chart.remove();
    },[data]);
    
    
    useEffect(()=>{
        fetchData();
    },[currency])
    return(
        <div className='char-table'>
            {
                loading ? (<span class="loader"></span>)
                :(<div className='chart-cointainer' ref={chartRef}>
            <h1>Historical Price Data</h1>       
        </div>)
            }

            {data.length>0 &&
        <table>
            <thead>
                <tr>
                    <th>24h</th>
                    <th>7d</th>
                    <th>14d</th>
                    <th>30d</th>
                    <th>60d</th>
                    <th>90d</th>
                    <th>180d</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={calculatePercentageChange(1)>0 ? 'green' : 'red'}>{calculatePercentageChange(1)}%</td>
                    <td className={calculatePercentageChange(7)>0 ? 'green' : 'red'}>{calculatePercentageChange(7)}%</td>
                    <td className={calculatePercentageChange(14)>0 ? 'green' : 'red'}>{calculatePercentageChange(14)}%</td>
                    <td className={calculatePercentageChange(30)>0 ? 'green' : 'red'}>{calculatePercentageChange(30)}%</td>
                    <td className={calculatePercentageChange(60)>0 ? 'green' : 'red'}>{calculatePercentageChange(60)}%</td>
                    <td className={calculatePercentageChange(90)>0 ? 'green' : 'red'}>{calculatePercentageChange(90)}%</td>
                    <td className={calculatePercentageChange(180)>0 ? 'green' : 'red'}>{calculatePercentageChange(180)}%</td>
                </tr>
            </tbody>
        </table>
            }
        </div>
    )
}