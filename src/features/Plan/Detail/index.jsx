import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import {TrailCard, TemperatureCard, PrecipitationCard} from '../../../components/Cards';
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
            fetch(`/plan/${planId}`).then(res => res.json()).then(data => setPlan(data));
        }
    }, [planId])

    return (
        <div style={S.PlanContainer}>
            <div>
                { planId && plan?.plan ? (
                    <TrailCard
                        key={plan.trail.id}
                        name={plan.trail.name} 
                        description={plan.trail.description} 
                        difficulty={plan.trail.difficulty_rating} 
                        elevation={plan.trail.elevation_gain}
                        distance={plan.trail.miles}
                    />
                    ) : (
                        <div>Loading plan...</div>
                    )
                }
            </div>
            <div>
            { planId && plan?.plan ? (
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