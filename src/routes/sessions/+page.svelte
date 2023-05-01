<script lang="ts">
	import moment from 'moment';
    import { _ } from 'svelte-i18n'

	import FinishedSessionDetail from '../../components/sessions/finishedSessionDetail.svelte';
	import SessionToReviewDetail from '../../components/sessions/sessionToReviewDetail.svelte';
	import type { PageData } from './$types';
	import UpcomingSessionDetail from '../../components/sessions/upcomingSessionDetail.svelte';
    
    export let data: PageData;
</script>

<style>
    li {
        list-style-type: none;
    }

    .sessionDetails {
        padding: 10px 20px;
        background: var(--primary-focus-mild);
        border-radius: 5px
    }
</style>

<article class="sessionsContainer">
    <details>
        <summary>
            {$_("upcomingSessions", {values: {length: data.sessions.upcomingSessions?.length}})}
        </summary>

        <ul id="upcomingSessionsContainer">
            {#each data.sessions.upcomingSessions as upcomingSession }
                <li class="sessionDetails">
                    <UpcomingSessionDetail sessionDetails={{
                        date: moment.utc(upcomingSession.startDateTime).format("DD/MM/YYYY HH:mm"),
                        withName: `${upcomingSession.with.firstName} ${upcomingSession.with.lastName}`,
                        as: upcomingSession.as,
                        id: upcomingSession.id
                    }} />
                </li>
            {/each}
        </ul>

    </details>
</article>

<article class="sessionsContainer">
    <details>
        <summary>
            {$_("sessionsToReview", {values: {length: data.sessions.sessionsToReview?.length}})}
        </summary>
        <ul id="sessionsToReviewContainer">
            {#each data.sessions.sessionsToReview as sessionToReview }
                <li class="sessionDetails">
                    <SessionToReviewDetail sessionDetails={{
                            date: moment.utc(sessionToReview.startDateTime).format("DD/MM/YYYY HH:mm"),
                            mentorName: `${sessionToReview.with.firstName} ${sessionToReview.with.lastName}`,
                            id: sessionToReview.id
                        }}/>
                </li>
            {/each}
        </ul>
    </details>
</article>

<article class="sessionsContainer">
    <details>
        <summary>
            {$_("finishedSessions", {values: {length: data.sessions.finishedSessions?.length}})}
        </summary>

        <ul id="finishedSessionsContainer">
            {#each data.sessions.finishedSessions as finishedSession }
                <li class="sessionDetails">
                    <FinishedSessionDetail sessionDetails={{
                        date: moment.utc(finishedSession.startDateTime).format("DD/MM/YYYY HH:mm"),
                        withName: `${finishedSession.with.firstName} ${finishedSession.with.lastName}`,
                        score: finishedSession.score,
                        details: finishedSession.details,
                        id: finishedSession.id,
                        as: finishedSession.as
                    }} />
                </li>
            {/each}
        </ul>

    </details>
</article>
