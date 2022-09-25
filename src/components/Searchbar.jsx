import "./Searchbar.css"
import {useEffect, useState } from "react"
import { MdLocationOn } from 'react-icons/md';
import {BiSearch} from 'react-icons/bi'
import { Forecast } from "./Forecast";
import { CurrentWeather } from "./CurrentWeather";
import { Progress } from "./Progress";
import ClipLoader from "react-spinners/ClipLoader";


const suggestionURL = "https://api.weatherapi.com/v1/search.json?key=195baf4aebc34d98b00112221222409&q="

const weatherURL = (city)=> 
`https://api.weatherapi.com/v1/forecast.json?key=195baf4aebc34d98b00112221222409&q=${city}&days=7&aqi=no&alerts=no`

export const Searchbar = ()=>{
    const [loading,setLoading] = useState(false)
    const [autoCity,setAutoCity] = useState("")
    const [city,setCity] = useState("bengaluru")
    const [clicked,setClicked] = useState(false)
    const [current,setCurrent] = useState()
    const [forecast,setForecast] = useState()
    const [location,setLocation] = useState("")
    const [suggestion,setSuggestion] = useState([])
    
    useEffect(()=>{
      const fetchAutoCity = async ()=>{
        const autoURL = "https://ipinfo.io/json?token=03d43514b3f83e"
        const response = await fetch(autoURL)
        const data = await response.json()
        setAutoCity(data.city);
      }
    fetchAutoCity();
    },[])
    
  
     
   useEffect(()=>{
    
          const getDataAfterTimeout = setTimeout(()=>{
             
            const getSuggestion = async ()=>{
             
          
                const response = await fetch(suggestionURL+city)
                const data = await response.json()
                const suggestedData = data.map((currentData)=>
                    `${currentData.name},${currentData.region}`
                )
                
                setSuggestion(suggestedData)
                
              }
              if(!clicked && city.length>2){
                getSuggestion()
              }
              else{
                setSuggestion([])
                setClicked(false)
              }
              
              return ()=>clearInterval(getDataAfterTimeout)

          },1000)
   
   },[city])

   const handleClick = async (clickedCity)=>{
       
       setCity(clickedCity)
       setClicked(true)
       setLoading(true)
       

       const response = await fetch(weatherURL(city))
       const data  = await response.json();
       setCurrent(data.current)
       setForecast(data.forecast)
       setLocation(data.location.name)
       setLoading(false)
      console.log(city)
                 
   }
   

   
   
  

    return(
      
        <div className="Search-bar" >
           {loading?<ClipLoader color={"aqua"} loading={loading}  size={150} />:  <div>
             {/* --------------------------------------- Location Input ---------------------------------------- */}

            <div className="search-box">
            <div className="search-loc"><MdLocationOn size="25px" /></div>
            <div className="search-input" ><input onChange={(event)=>setCity(event.target.value)} value={city} className="location-input" type="text" placeholder="Enter Location" /></div>
            <div className="search-btn" ><BiSearch size="25px"  /></div>
            </div>
            {suggestion.length>2 && 
                
                <div className="suggestion-box">
                  {suggestion.map((item)=>{
                    return(
                        <div onClick={()=>handleClick(item)}  className="suggestion" >{item}</div>
                    )
                  })}
               </div>

            }

            

            {/* ---------------------------------- 5 days Forecast ---------------------------------------- */}
  
      
      {current &&  <div>
            <div>
                   <div>{forecast && <Forecast forecast={forecast} />} </div>
            </div>
            

            {/* --------------------------------------- Display temperature ----------------------------------------- */}


            <div className="display" >
            <div className="temperature-box" >
                         {current && <CurrentWeather current={current} city={location} />}
                         <div className="temp-logo" ></div>
                 </div>

               
               <div className="progress">
                        {forecast && <Progress progress={forecast} />}
                </div>

             {/* ---------------------------------- Pressure & humidity ------------------------------------ */}
              
             <div className="pressure-humidity" >
             <div className="pressure" >
                    <p className="head" >Pressure</p>
                   <p>{current && current.pressure_mb} hpa</p> 
                </div>
                <div className="humidity" >
                    <p className="head" >Humidity</p>
                    <p>{current && current.humidity} %</p>
                </div>
              </div>
</div>      
           </div>}

  
   
           </div>}
        </div>
    )
}