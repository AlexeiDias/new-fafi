import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import * as locales from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import API from '../api/axios';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'en-US': locales.enUS
  }
});

function CalendarView({ user }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const res = await API.get('/bills');
        const userBills = res.data.filter(b => b.user === user);
        const calendarEvents = userBills.map(bill => ({
          title: `${bill.name} 💸 $${bill.amount}`,
          start: new Date(bill.dueDate),
          end: new Date(bill.dueDate),
        }));
        setEvents(calendarEvents);
      } catch (err) {
        console.error('🛑 Error loading calendar data:', err.message);
      }
    };

    fetchCalendarData();
  }, [user]);

  return (
    <div style={{ height: '500px', backgroundColor: '#fff', borderRadius: '12px', padding: '1rem' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        popup
      />
    </div>
  );
}

export default CalendarView;
