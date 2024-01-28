import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../../../components/Dropdown';
import Calendar from '../../../components/Calendar';
import * as S from './style';

const Plan = () => {
  const navigate = useNavigate();
  const [trailNames, setTrailNames] = useState([]);
  const [selectedTrailName, setSelectedTrailName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAmPm, setSelectedAmPm] = useState('');
  const [formDisabled, setFormDisabled] = useState(true);
  const timeRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const amPm = ['AM', 'PM'];

  useEffect(() => {
      if (!trailNames.length) {
          fetch('/plan').then(res =>res.json()).then(data => setTrailNames(data));
      }
  }, []);

  useEffect(() => {
      setSelectedTrailName(trailNames[0]);
      setSelectedTime(timeRange[0]);
      setSelectedAmPm(amPm[0]);
  }, [trailNames.length]);
   
  useEffect(() => {
    console.log('changes!', selectedTrailName, selectedDate, selectedTime, selectedAmPm)
      if (selectedTrailName && selectedDate && selectedTime && selectedAmPm) {
        setFormDisabled(false);
      } else {
        setFormDisabled(true);
      }
  }, [selectedTrailName, selectedDate, selectedTime, selectedAmPm]);

  const handleCreatePlan = () => {

    console.log('handling plan', selectedTrailName, selectedDate, selectedTime, selectedAmPm)
      if (!formDisabled) {
        const payload = {
          'trail': selectedTrailName,
          'date': selectedDate,
          'time': selectedTime,
          'ampm': selectedAmPm
        }
        console.log('Payload: ', payload)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        };
        fetch('/plan', requestOptions)
          .then(response => response.json())
          .then(data => {
            // console.log(data);
            navigate(`/plan/${data}`, {state: {id: data}});
          })
          .catch(error => console.error('Error:', error));
      }
  };

  return (
      <div style={S.FormContainer}>
          <div style={S.FormItem}>
              <div>Select your route:</div>
              <Dropdown 
                    dropdownItems={trailNames}
                    handleDropdownSelection={(option) => setSelectedTrailName(option)}
              />
          </div>
              <div>When do you plan to hike?</div>
          <div style={S.FormItem}>
              <Calendar selectedDate={selectedDate} onChange={(date) => setSelectedDate(date)} />
          </div>
          <div style={S.FormItem}>
              <div>What time will you start your hike?</div>
              <Dropdown
                  dropdownItems={timeRange}
                  handleDropdownSelection={(time) => setSelectedTime(time)}
              />
              <Dropdown
                  dropdownItems={amPm}
                  handleDropdownSelection={(amPm) => setSelectedAmPm(amPm)}
              />
          </div>
          <div style={S.ButtonContainer}>
              <button style={S.Button} disabled={formDisabled} onClick={handleCreatePlan}>Create Plan</button>
          </div>
      </div>
  );
}
  
export default Plan;
  