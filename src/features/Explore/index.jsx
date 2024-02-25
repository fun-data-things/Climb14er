import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrailCardExplore from '../../components/Cards/TrailCardExplore';
import * as S from './style';

const Explore = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        if (!trails.length) {
          fetch(`${process.env.REACT_APP_API_URL}/explore`)
          .then(res =>res.json())
          .then(data => {
            setTrails(data);
            setIsLoading(false);
          });
        }
    }, []);

    const planTrail = (trailName) => {
        navigate('/plan', {state: {name: trailName}});
    };

    return (
      <div>
        { isLoading ? (
          <div>Loading...</div>
        ) : (
          <div style={S.ExploreContainer}>
            {trails.map((trail) => {
              return (
                <div>
                  <TrailCardExplore
                    key={trail.id}
                    name={trail.name} 
                    route={trail.route}
                    range={trail.range}
                    difficulty_class={trail.difficulty_class} 
                    mileage={trail.mileage}
                    elevation={trail.elevation_gain}
                    trailhead={trail.trailhead}
                    google_maps={trail.google_maps} 
                    distance_to_denver={trail.distance_to_denver}
                    kind_of_trip={trail.kind_of_trip}
                    trip_description={trail.trip_description}
                    next_summit_route={trail.next_summit_route}
                    notes={trail.notes}
                    latitude={trail.latitude}
                    longitude={trail.longitude}
                    planTrail={planTrail}
                  />
                </div>
              )}
            )}
          </div>
        )}
      </div>
    );
  }
  
  export default Explore;
  