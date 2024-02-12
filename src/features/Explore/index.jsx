import { useEffect, useState } from 'react';
import TrailCard from '../../components/Cards/TrailCard';
import * as S from './style';

const Explore = () => {
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        if (!trails.length) {
          console.log(process.env.REACT_APP_API_URL)
          fetch(`${process.env.REACT_APP_API_URL}/explore`).then(res =>res.json()).then(data => setTrails(data));
        }
    }, []);

    return (
      <div style={S.ExploreContainer}>
        {trails.map((trail) => (
          <TrailCard
            key={trail.id}
            name={trail.name} 
            route={trail.route}
            range={trail.range}
            difficulty_class={trail.difficulty_class} 
            mileage={trail.mileage}
            elevation={trail.elevation_gain}
            trailhead={trail.trailhead}
            google_maps={trail.google_maps}
            description={trail.description} 
            distance_to_denver={trail.distance_to_denver}
            kind_of_trip={trail.kind_of_trip}
            trip_description={trail.trip_description}
            next_summit_route={trail.next_summit_route}
            notes={trail.notes}
            latitude={trail.latitude}
            longitude={trail.longitude}
          />
        ))}
      </div>
    );
  }
  
  export default Explore;
  