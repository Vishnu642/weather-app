
import { ScrollRestoration } from "react-router-dom"
import "./Forecast.css"

export const Forecast=({forecast:{forecastday}})=>{

    return(
        <div className="forecast-box" >
            {forecastday.map((item)=>{
                return(
                    <div className="forecast-data" >
                    <div className="day" >{item.date}</div>
                    <div className="curr-temp" >
                    <div><p>{item.day.maxtemp_c}°</p></div>
                    <div><p>{item.day.mintemp_c}°</p></div>
                    </div>
                    <div className="curr-img" ><img className="daily-img" src={item.day.condition.icon} /></div>
                    <div className="curr-weather" ><p>{item.day.condition.text}</p></div>
                    
                </div>
                )
            })}
            
         
        </div>
    )
}