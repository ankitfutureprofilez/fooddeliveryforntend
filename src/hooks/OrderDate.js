import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function OrderDate({dateString}) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (dateString) {
      const momentDate = moment(dateString);
      const formattedDateString = momentDate.format('DD MMMM YYYY h:mm A');
      setFormattedDate(formattedDateString);
    }
  }, [dateString]);

  return (
    <div>
      {formattedDate && <p>{formattedDate}</p>}
    </div>
  );
}
