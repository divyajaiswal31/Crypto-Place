import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom' //useParams are used to find the coin id from the url
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const {coinId} = useParams();
  const[CoinData,setCoinData] = useState();
  const[historicalData, setHistoricalData] = useState();
  const{currency} = useContext(CoinContext);

  const fetchCoinData = async() =>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-JZHe2dxpNvmi77EWVZ4Y1tXi'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`,options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async() =>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-api-key': 'CG-JZHe2dxpNvmi77EWVZ4Y1tXi'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  },[currency])

  // useEffect(()=>{
  //   fetchHistoricalData();
  // },[currency])
  
  if(CoinData && historicalData){
  return (
    <div className='coin'>
      <div className='coin-name'>
        <img src={CoinData.image.large} alt="" />
        <p>{CoinData.name} ({CoinData.symbol.toUpperCase()})</p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData}/>
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{CoinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {CoinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol} {CoinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>{currency.symbol} {CoinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>{currency.symbol} {CoinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  )}
  else{
    return(
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    )
  }
  }



export default Coin
