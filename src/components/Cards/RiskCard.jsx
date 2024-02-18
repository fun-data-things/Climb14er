import * as S from './style';

const RiskCard = ({ riskLabel }) => {
    console.log("Risk Score", riskLabel)
    return (
        <div style={S.RiskContainer}>
            <div style={S.CardTitle}>Risk Score</div>
            <div style={S.RiskTitle}>{ riskLabel }</div>
        </div>
    )
};

export default RiskCard;