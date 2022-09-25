import "./Progress.css"
import LinearProgress from '@mui/material/LinearProgress';


export const Progress = ({progress:{forecastday}})=>{
   
    return(
        <div className='progress-box' >
           
           {forecastday.map((curDateForecast)=>{
                 const {date,day,hour} = curDateForecast;
                 const {maxtemp_c,condition:{icon,text}} = day;
                 return(
                    <div>
                    {hour.map((curHourForecast)=>{
                        return(
                            <div className="hour-box" >
                                <div className="hour-data" >
                                <div className="data-time" >{curHourForecast.time}</div>    
                                <div className="data-temp" >{curHourForecast.temp_c}° C</div>
                                <div className="data-icon" ><img src={curHourForecast.condition.icon} width="40px" height="40px" /></div>
                                </div>
                                <div className="hour-temp" >
                                <LinearProgress variant="determinate" value={(curHourForecast.temp_c*100)/maxtemp_c} />
                                </div>
                            </div>
                        )
                    })}
                      </div>
                     
                 )
                  
           })}

            
            
        </div>
    )
}