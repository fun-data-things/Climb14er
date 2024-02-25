import MapComponent from "./MapWithMarker"
import { Button } from '../../features/Plan/Create/style'
import * as S from './style';

const TrailCardExplore = ({ 
    name, 
    route, 
    range, 
    difficulty_class, 
    mileage, 
    elevation, 
    trailhead, 
    google_maps,
    latitude,
    longitude,
    planTrail
}) => {
return (
    <div style={S.ExploreTrailCard}>
        <div style={S.ExploreTrailContainer}>
            <div>
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
            <MapComponent 
                latitude={latitude} 
                longitude={longitude} 
                style={S.MapContainerStyleExplore}
            />
        </div>
        <div style={S.ButtonContainer}>
            <button onClick={() => planTrail(name)} style={Button}>Plan It</button>
        </div>
    </div>
)
};

export default TrailCardExplore;