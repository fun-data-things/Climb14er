import { Bar } from "react-chartjs-2";
import * as S from './style';

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
};

export default PrecipitationCard;