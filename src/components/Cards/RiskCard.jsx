import * as S from './style';

const RiskCard = ({ riskLabel }) => {
    const riskOptions = { 
        Low: {
            label: 'Low',
            color: 'lightblue'
        },
        Medium: {
            label: 'Medium',
            color: 'yellow'
        },
        High: {
            label: 'High',
            color: 'orange'
        },
        Extreme: {
            label: 'Extreme',
            color: 'red'
        }
    };

    return (
        <div style={S.RiskContainer}>
            <div style={S.CardTitle}>Risk Score</div>
            <div style={S.FormatRiskTitle(riskOptions[riskLabel].color)}>{ riskLabel }</div>
        </div>
    )
};

export default RiskCard;