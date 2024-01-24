import { useEffect, useState } from 'react';

const Explore = () => {
    const [trails, setTrails] = useState([{ id: 0, trailName: 'Grey Peak'}]);

    useEffect(() => {
        if (!trails.length) {
            // make API call
            // setTrails(response)
        }
    }, []);

    return (
      <div className="Explore">
        { trails.map((trail) => (
            <div key={trail.id}>{trail.trailName}</div>
        ))}
      </div>
    );
  }
  
  export default Explore;
  