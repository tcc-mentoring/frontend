<script lang="ts">
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import { _ } from 'svelte-i18n'
    import type { PageData } from './$types';

    import '@event-calendar/core/index.css';
    
    let plugins = [TimeGrid];
    export let data: PageData;

    let menteeSessions = data.menteeSessions.map((session: { endDateTime: string; startDateTime: string; with: {firstName: string} }) => ({end: session.endDateTime, start: session.startDateTime, title: session.with.firstName, backgroundColor: "red"}));
    
    let options = {
        view: 'timeGridWeek',
        allDaySlot: false,
        buttonText: {
            today: $_("today")
        },
        headerToolbar: {start: 'title today', center: '', end: 'prev,next'},
        locale: "pt-BR",
        events: menteeSessions
    };
</script>


<section>
    <h2>{$_("eventCalendar")}</h2>
    <Calendar {plugins} {options} />
</section>