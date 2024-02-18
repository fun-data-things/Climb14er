import { Bar } from "react-chartjs-2";
import * as S from './style';

const PrecipitationCard = ({ precipitation, timestamps }) => {
    console.log("precription", precipitation)
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
                            borderWidth:2,
                            backgroundColor: '#5567FE',
                            borderColor:'#5567FE',
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
                                },
                                stepSize: 0.25,
                            },
                            min: 0,
                            max: 1,
                        }
                    }
                }}
            />
        </div>
    )
};

export default PrecipitationCard;