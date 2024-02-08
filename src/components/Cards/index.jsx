import { Line, Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import * as S from './style';


const TrailCard = ({ 
        name, 
        route, 
        range, 
        difficulty_class, 
        mileage, 
        elevation, 
        trailhead, 
        google_maps, 
        description, 
        distance_to_denver, 
        kind_of_trip, 
        trip_description, 
        next_summit_route, 
        notes 
    }) => {
    return (
        <div style={S.CardContainer}>
            <div style={S.CardTitle}><h3>{ name }</h3></div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Route: </span>
                { route }
            </div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Range: </span>
                { range }
            </div>
            <div style={S.CardDetails}>
            <span style={S.CardLabel}>Trailhead: </span>
                <a href={google_maps}>{trailhead}</a></div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Class: </span>
                { difficulty_class }/5
            </div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Mileage: </span>
                { mileage } miles
            </div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Elevation Gain: </span>
                { elevation } ft.
            </div>
            
        </div>
    )
};

const TemperatureCard = ({ temperature, timestamps }) => {
    return (
        <div style={S.TemperatureContainer}>
            <div style={S.CardTitle}>Hourly Temperatures (Farenheit)</div>
            <Line
                data={{
                    labels: timestamps,
                    datasets: [
                        {
                            label: "Temperature (in Fareneheit)",
                            data: temperature,
                            fill: false,
                            borderWidth:4,
                            backgroundColor: "rgb(255, 99, 132)",
                            borderColor:'green',
                            responsive:false
                        },
                    ],
                }}
                options = {{
                    plugins: {
                        legend: {
                          display: false
                        },
                    },
                }}
            />
        </div>
    )
};

const PrecipitationCard = ({ precipitation, timestamps }) => {
    return (
        <div style={S.PrecipContainer}>
            <div style={S.CardTitle}>Hourly Chance of Precipitation</div>
            <Bar
                data={{
                    labels: timestamps,
                    datasets: [
                        {
                            label: "Chance of Precipitation (%)",
                            data: precipitation,
                            fill: false,
                            borderWidth:4,
                            backgroundColor: "rgb(255, 99, 132)",
                            borderColor:'blue',
                            responsive:false
                        },
                    ],
                }}
                options = {{
                    plugins: {
                        legend: {
                          display: false
                        },
                    },
                    scales: {
                        y: {
                            ticks: {
                                format: {
                                    style: 'percent'
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export {
    TrailCard,
    TemperatureCard,
    PrecipitationCard
};