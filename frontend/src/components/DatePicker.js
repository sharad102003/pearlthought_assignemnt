import React, { useState } from 'react';

const DatePicker = ({ onSelectDates }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recurrenceType, setRecurrenceType] = useState('none');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [specificDays, setSpecificDays] = useState([]);

  const handleRecurrenceSubmit = () => {
   
    const recurrenceOptions = {
      startDate,
      endDate,
      recurrenceType,
      recurrenceInterval,
      specificDays,
    };

  
    console.log("Recurrence options in DatePicker:", recurrenceOptions);

   
    onSelectDates(recurrenceOptions);
  };

  return (
    <div className="bg-gray-300 p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg">Recurrence Options</h3>
      
      <div className="space-y-4">
        
        <select
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="none">No Recurrence</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        
       
        {recurrenceType !== 'none' && (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </>
        )}

        {recurrenceType === 'weekly' && (
          <div className="space-y-2">
            <label>Select Days of Week:</label>
            <div className="flex space-x-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <label key={day} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={specificDays.includes(index)}
                    onChange={() => {
                      if (specificDays.includes(index)) {
                        setSpecificDays(specificDays.filter((d) => d !== index));
                      } else {
                        setSpecificDays([...specificDays, index]);
                      }
                    }}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        
        <button
          type="button"
          className="bg-blue-700 text-white p-2 rounded-lg"
          onClick={handleRecurrenceSubmit}
        >
          Set Recurrence
        </button>
      </div>

      
      <div className="mt-4 p-2 border border-gray-300 rounded-lg bg-white">
        <h4 className="font-semibold"><strong>Preview Recurrence:</strong></h4>
        <p>Start Date: {startDate || 'not selected'}</p>
        <p>End Date: {endDate || 'not selected'}</p>
        <p>Recurrence Type: {recurrenceType}</p>
        {recurrenceType === 'weekly' && (
          <p>
            Specific Days: {specificDays.length > 0 ? specificDays.map(day => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]).join(', ') : 'None'}
          </p>
        )}
      </div>
    </div>
  );
};

export default DatePicker;


