import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'

const Home = () => {
    const [data,setData]=useState([])
    const [loading, setLoading] = useState(false);
    const [search,setSearch]=useState('');
    
    const api=async()=>{
      try{
        setLoading(true);
        //console.log("hhhhhh")
        const res=await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=6639a07bd825756b53c97c4005e0746c`);
        setData((res.data.list))

    }
    catch(err){
        console.log(err)
    }
    }
   
   function fetchData(event){
    setSearch(event.target.value)
   }
  return (
    <div>
        <p>Running</p>
        <input
        type="text"
        className='bg-yellow-400 text-black'
        onChange={fetchData}
        value={search}
          />
          <button 
          className='bg-gray-400 rounded-xl'
          onClick={api}
          >Search</button>
           <div>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className='p-2'>
                            <p>Date and Time: {new Date(item.dt * 1000).toLocaleString()}</p>
                            <p>Temperature: {item.main.temp} K</p>
                            <p>Wind Speed: {item.wind.speed} m/s</p>
                            <p>Weather: {item.weather[0].description}</p>
                        </div>
                    ))
                ) : (
                    !loading && <p>No data available</p>
                )}
            </div>
    </div>
  )
}

export default Home
