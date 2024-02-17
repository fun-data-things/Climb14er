import SimpleMap from "./SimpleMap";
import * as S from './style';

const TrailCard = ({ 
        name, 
        route, 
        range, 
        difficulty_class, 
        mileage, 
        elevation, 
        trailhead, 
        google_maps, 
        description, 
        distance_to_denver, 
        kind_of_trip, 
        trip_description, 
        next_summit_route, 
        notes,
        latitude,
        longitude
    }) => {
    return (
        <div style={S.CardContainer}>
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
            <SimpleMap 
                latitude={latitude} 
                longitude={longitude} 
                name={name}
            />
        </div>
    )
};

export default TrailCard;