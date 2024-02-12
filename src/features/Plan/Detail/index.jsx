import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import TrailCard from '../../../components/Cards/TrailCard';
import TemperatureCard from '../../../components/Cards/TemperatureCard';
import PrecipitationCard from '../../../components/Cards/PrecipitationCard';
import Chart from 'chart.js/auto'; // This is required - it is not called directly, but chartJS will fail without it
import * as S from './style';

const PlanDetail = () => {
    const [planId, setPlanId] = useState('');
    const [plan, setPlan] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state.id) {
            setPlanId(location.state.id);
        }
    }, [])

    useEffect(() => {
        if (planId) {
            fetch(`${process.env.REACT_APP_API_URL}/plan/${planId}`).then(res => res.json()).then(data => setPlan(data));
        }
    }, [planId])

    return (
        <div>
            <div style={S.DetailContainer}>
                { planId && plan?.plan ? (
                    <TrailCard
                        key={plan.trail.id}
                        name={plan.trail.name} 
                        route={plan.trail.route}
                        range={plan.trail.range}
                        difficulty_class={plan.trail.difficulty_class} 
                        mileage={plan.trail.mileage}
                        elevation={plan.trail.elevation_gain}
                        trailhead={plan.trail.trailhead}
                        google_maps={plan.trail.google_maps}
                        description={plan.trail.description} 
                        distance_to_denver={plan.trail.distance_to_denver}
                        kind_of_trip={plan.trail.kind_of_trip}
                        trip_description={plan.trail.trip_description}
                        next_summit_route={plan.trail.next_summit_route}
                        notes={plan.trail.notes}
                        latitude={plan.trail.latitude}
                        longitude={plan.trail.longitude}
                    />
                    ) : (
                        <div>Loading plan...</div>
                    )
                }
            </div>
            <div style={S.TemperatureContainer}>
                {planId && plan?.plan ? (
                    <TemperatureCard
                        key={plan.forecast.id}
                        timestamps={plan.forecast.timestamps}
                        temperature={plan.forecast.temp_12hr}
                    />
                    ) : (
                        <div>Loading plan...</div>
                    )
                }
            </div>
            <div>
            { planId && plan?.plan ? (
                    <PrecipitationCard
                        key={plan.forecast.id}
                        timestamps={plan.forecast.timestamps}
                        temperature={plan.forecast.precip_probability_12hr}
                    />
                    ) : (
                        <div>Loading plan...</div>
                    )
                }
            </div>
        </div>
    )
}

export default PlanDetail;