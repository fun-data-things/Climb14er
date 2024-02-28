import * as S from './style';

const RiskCard = ({ riskLabel, riskExplanation }) => {
    const riskOptions = { 
        Low: {
            label: 'Low',
            color: '#3463AC'
        },
        Medium: {
            label: 'Medium',
            color: '#FBBF0D'
        },
        High: {
            label: 'High',
            color: '#f28111'
        },
        Extreme: {
            label: 'Extreme',
            color: '#d11212'
        }
    };

    return (
        <div style={S.RiskContainer}>
            <div style={S.CardTitle}>Risk Score</div>
            <div style={S.FormatRiskTitle(riskOptions[riskLabel].color)}>{ riskLabel }</div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Primary Risk Factor: </span>
                { riskExplanation }
            </div>
        </div>
    )
};

export default RiskCard;