<script lang="ts">
	import moment from 'moment';
    import { _ } from 'svelte-i18n'

	import FinishedSessionDetail from '../../components/sessions/finishedSessionDetail.svelte';
	import SessionToReviewDetail from '../../components/sessions/sessionToReviewDetail.svelte';
	import type { PageData } from './$types';
    
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
            {$_("sessionsToReview", {values: {length: data.pastSessions.sessionsToReview?.length}})}
        </summary>
        <ul id="sessionsToReviewContainer">
            {#each data.pastSessions.sessionsToReview as sessionToReview }
                <li class="sessionDetails">
                    <SessionToReviewDetail sessionDetails={{
                            date: moment(sessionToReview.startDateTime).format("DD/MM/YYYY HH:mm"),
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
            {$_("finishedSessions", {values: {length: data.pastSessions.finishedSessions?.length}})}
        </summary>

        <ul id="finishedSessionsContainer">
            {#each data.pastSessions.finishedSessions as finishedSession }
                <li class="sessionDetails">
                    <FinishedSessionDetail sessionDetails={{
                        date: moment(finishedSession.startDateTime).format("DD/MM/YYYY HH:mm"),
                        mentorName: `${finishedSession.with.firstName} ${finishedSession.with.lastName}`,
                        score: finishedSession.score,
                        details: finishedSession.details
                    }} />
                </li>
            {/each}
        </ul>

    </details>
</article>