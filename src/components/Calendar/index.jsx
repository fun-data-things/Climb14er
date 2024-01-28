
const Calendar = ({ selectedDate, onChange }) => {
   
    return (
        <div>
            <input type="date" value={selectedDate} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default Calendar;