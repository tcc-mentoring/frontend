<script lang="ts">
    import { _ } from 'svelte-i18n'
	import TextGroup from '../commons/textGroup.svelte';

    export let sessionDetails: {
        date: string,
        mentorName: string,
        score: number,
        details: string,
        id: number
    };
</script>

<style>
    .finishedSessionDetail > .grid:first-child {
        margin-bottom: 20px;
    }
</style>

<div class="finishedSessionDetail">
    <div class="grid">
        <TextGroup identifier="session-date" labelSlug="sessionDate" text={sessionDetails.date}/>
        <TextGroup identifier="session-mentor" labelSlug="sessionsMentor" text={sessionDetails.mentorName} />
    </div>
    <div class="grid">
        <TextGroup identifier="session-review-score" labelSlug="sessionReviewScore" text={sessionDetails.score.toString()} />
        <TextGroup identifier="session-review-details" labelSlug="sessionReviewDetails" text={sessionDetails.details} />
    </div>

    <button type="button" class="outline" on:click={() => {
        window.location.href =  `/sessions/${sessionDetails.id}`;
    }}>{$_("openSessionDetails")}</button>
</div>