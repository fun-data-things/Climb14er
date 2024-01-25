import { useEffect, useState } from 'react';

const Explore = () => {
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        // if (!trails.length) {
            // make API call
            // setTrails(response)
            fetch('/explore').then(res =>res.json()).then(data => {
              console.log('data: ', data);
              setTrails(data);
            });
        // }
    }, []);

    return (
      <div className="Explore">
        { trails.map((trail) => (
            <div key={trail.id}>{trail.name}</div>
        ))}
      </div>
    );
  }
  
  export default Explore;
  