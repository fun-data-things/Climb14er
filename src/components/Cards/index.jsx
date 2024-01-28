import { Line, Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import * as S from './style';

const TrailCard = ({ name, description, difficulty, elevation, distance }) => {
    return (
        <div style={S.CardContainer}>
            <div style={S.CardTitle}>{ name }</div>
            <div style={S.CardDetails}>{ description }</div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Difficulty Level: </span>
                { difficulty }/5
            </div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Elevation Gain: </span>
                { elevation } ft.
            </div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Distance: </span>
                { distance } miles
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