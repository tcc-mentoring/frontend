<script lang="ts">
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import { _ } from 'svelte-i18n'
    import type { PageData } from './$types';

    import '@event-calendar/core/index.css';
	import { sessionMapToCalendar, type SessionDTO } from '../../utils/session';
    
    let plugins = [TimeGrid];
    export let data: PageData;

    let menteeSessions = data.userSessions.asMentee.map((session: SessionDTO) => sessionMapToCalendar(session, "mentee", $_("menteeTitle")));
    let mentorSessions = data.userSessions.asMentor.map((session: SessionDTO) => sessionMapToCalendar(session, "mentor", $_("mentorTitle")));

    let options = {
        view: 'timeGridWeek',
        allDaySlot: false,
        buttonText: {
            today: $_("today")
        },
        headerToolbar: {start: 'title today', center: '', end: 'prev,next'},
        locale: "pt-BR",
        events: [...menteeSessions, ...mentorSessions]
    };
</script>


<section>
    <h2>{$_("eventCalendar")}</h2>
    <Calendar {plugins} {options} />
</section>