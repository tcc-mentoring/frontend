<script>
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import { _ } from 'svelte-i18n'

    import '@event-calendar/core/index.css';
    
    let plugins = [TimeGrid];
    let options = {
        view: 'timeGridWeek',
        allDaySlot: false,
        buttonText: {
            today: $_("today")
        },
        headerToolbar: {start: 'title today', center: '', end: 'prev,next'},
        locale: "pt-BR",
        events: [
        ]
    };
</script>


<section>
    <h2>{$_("eventCalendar")}</h2>
    <Calendar {plugins} {options} />
</section>