import { Line } from "react-chartjs-2";
import * as S from './style';

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
                            backgroundColor: "#FFB93F",
                            borderColor:'#FFB93F',
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

export default TemperatureCard;