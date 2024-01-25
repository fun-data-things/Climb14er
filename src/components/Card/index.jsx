import * as S from './style';

const Card = ({ name, description, difficulty, elevation, distance }) => {
    return (
        <div style={S.CardContainer}>
            <div style={S.CardTitle}>{ name }</div>
            <div style={S.CardDetails}>{ description }Temp description will go here!</div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Difficulty Level: </span>
                { difficulty }/5
            </div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Elevation: </span>
                { elevation }
            </div>
            <div style={S.CardDetails}>
                <span style={S.CardLabel}>Distance: </span>
                { distance } miles
            </div>
        </div>
    )
};

export default Card;