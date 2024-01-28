import { useEffect, useState } from 'react';
import { TrailCard } from '../../components/Cards';
import * as S from './style';

const Explore = () => {
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        if (!trails.length) {
          fetch('/explore').then(res =>res.json()).then(data => setTrails(data));
        }
    }, []);

    return (
      <div style={S.ExploreContainer}>
        {trails.map((trail) => (
          <TrailCard
            key={trail.id}
            name={trail.name} 
            description={trail.description} 
            difficulty={trail.difficulty_rating} 
            elevation={trail.elevation_gain}
            distance={trail.miles}
          />
        ))}
      </div>
    );
  }
  
  export default Explore;
  