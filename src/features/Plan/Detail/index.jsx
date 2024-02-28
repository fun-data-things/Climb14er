import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import TrailCardPlan from '../../../components/Cards/TrailCardPlan';
import TemperatureCard from '../../../components/Cards/TemperatureCard';
import PrecipitationCard from '../../../components/Cards/PrecipitationCard';
import RiskCard from '../../../components/Cards/RiskCard';
import Chart from 'chart.js/auto'; // This is required - it is not called directly, but chartJS will fail without it
import * as S from './style';
import moment from 'moment-timezone';

function convertTimeStampsToMountainTime(timeStamps) {
    const mountainTimeStamps = timeStamps.map(timestamp => {
      const date = moment.utc(timestamp, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('America/Denver');
      return date.format('h:mm A');
    });
    return mountainTimeStamps;
  }

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
            fetch(`${process.env.REACT_APP_API_URL}/plan/${planId}`).then(res => res.json()).then(data => {
                setPlan(data)
                console.log('plan data', data);
            });
        }
    }, [planId])

    return (
        <div style={S.PlanContainerParent} class="plan-parent-container">
            <div style={S.LeftPlanContainer} class="left-plan-container">
                { planId && plan?.plan && (
                    <div style={S.TrailDetailContainer}>
                        <div style={S.RiskContainer}>
                            <RiskCard
                                riskLabel={plan.plan.risk_label}
                                riskExplanation={plan.plan.risk_explanation}
                            />
                        </div>
                        <TrailCardPlan
                            key={plan.trail.id}
                            name={plan.trail.name} 
                            route={plan.trail.route}
                            range={plan.trail.range}
                            difficulty_class={plan.trail.difficulty_class} 
                            mileage={plan.trail.mileage}
                            elevation={plan.trail.elevation_gain}
                            trailhead={plan.trail.trailhead}
                            google_maps={plan.trail.google_maps}
                            distance_to_denver={plan.trail.distance_to_denver}
                            kind_of_trip={plan.trail.kind_of_trip}
                            next_summit_route={plan.trail.next_summit_route}
                            notes={plan.trail.notes}
                            latitude={plan.trail.latitude}
                            longitude={plan.trail.longitude}
                        />
                    </div>
                )
            }
            <div style={S.RightPlanContainer} class="right-plan-container">
                { planId && plan?.plan && (
                    <div>
                        <div style={S.ChartContainer}>
                            <TemperatureCard
                                key={plan.forecast.id}
                                timestamps={convertTimeStampsToMountainTime(plan.forecast.timestamps)}
                                temperature={plan.forecast.temp_12hr}
                            />
                        </div>
                        <div style={S.ChartContainer}>
                            <PrecipitationCard
                                key={plan.forecast.id}
                                timestamps={convertTimeStampsToMountainTime(plan.forecast.timestamps)}
                                precipitation={plan.forecast.precip_probability_12hr}
                            />
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    </div>
    )
}

export default PlanDetail;