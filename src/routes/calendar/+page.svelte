<script lang="ts">
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import { _ } from 'svelte-i18n'
    import type { PageData } from './$types';

    import '@event-calendar/core/index.css';
	import { sessionMapToCalendar } from '../../utils/session';
	import { closeDialog, openDialog } from '../../utils/dialog';
	import SessionInformationDetail from '../../components/sessions/sessionInformationDetail.svelte';
	import type { SessionDTO } from '../../validators/sessionValidator';
	import moment from 'moment';
    
    const SESSION_DETAIL_DIALOG_ID = "sessionDetailView";

    let plugins = [TimeGrid];
    export let data: PageData;

    let menteeSessions = data.userSessions.asMentee.map((session: SessionDTO) => sessionMapToCalendar(session, "mentee", $_("menteeTitle")));
    let mentorSessions = data.userSessions.asMentor.map((session: SessionDTO) => sessionMapToCalendar(session, "mentor", $_("mentorTitle")));

    let selectedSession: SessionDTO = {} as SessionDTO;

    let options = {
        view: 'timeGridWeek',
        allDaySlot: false,
        buttonText: {
            today: $_("today")
        },
        headerToolbar: {start: 'title today', center: '', end: 'prev,next'},
        locale: "pt-BR",
        events: [...menteeSessions, ...mentorSessions],
        eventClick: (event: any) => {
            selectedSession = event.event.extendedProps;
            console.log({selectedSession})
            openDialog(SESSION_DETAIL_DIALOG_ID);
        }
    };
</script>

<style>
    #sessionDetailsContainer {
        min-width: 400px;
    }
</style>

<section>
    <h2>{$_("eventCalendar")}</h2>
    <dialog id={SESSION_DETAIL_DIALOG_ID}>
        
        {#if Object.keys(selectedSession).length > 0}
            <article id="sessionDetailsContainer">
                <header>
                    {$_("sessionDetails")}
                </header>

                <SessionInformationDetail sessionDetails={{date: moment(selectedSession.startDateTime).format("DD/MM/YYYY HH:mm"), mentorName: selectedSession.with.firstName}}/>
                <footer>
                    <button type="submit">{$_("manageSession")}</button>

                    <button class="outline" type="button" on:click={() => {closeDialog(SESSION_DETAIL_DIALOG_ID)}}>{$_("close")}</button>
                </footer>
            </article>
        {/if}
    </dialog>
    <Calendar {plugins} {options} />
</section>