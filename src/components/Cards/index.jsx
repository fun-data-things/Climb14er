import { Line } from "react-chartjs-2";
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
        <div>
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
                            responsive:true
                        },
                    ],
                }}
            />
        </div>
    )
};

export {
    TrailCard,
    TemperatureCard
};