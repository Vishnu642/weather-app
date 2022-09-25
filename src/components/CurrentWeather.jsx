import "./CurrentWeather.css"

export const CurrentWeather=({current,city})=>{
    return(
        <div className="current-weather" >
            <div><h1>{city}</h1></div>
            <div><h1>{current.temp_c} °C</h1></div>
            <div><img  src={current.condition.icon} width="55px" height="55px" /></div>
        </div>
    )
}