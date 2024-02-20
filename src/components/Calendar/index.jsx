
const Calendar = ({ selectedDate, onChange }) => {
    const currentDate = new Date();
    // Weather API only allows hourly forecast in the next 5 days [TODO: CONFIRM EXACT NO. OF HOURS]
    const maxDate = new Date(currentDate);
    maxDate.setDate(maxDate.getDate() + 5);

    // Format the maximum date as yyyy-mm-dd
    const formattedMaxDate = maxDate.toISOString().split('T')[0];
   
    return (
        <div>
            <input type="date" value={selectedDate} min={currentDate.toISOString().split('T')[0]} max={formattedMaxDate} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default Calendar;