<script lang="ts">
    import { _ } from 'svelte-i18n'
	import TextGroup from '../commons/textGroup.svelte';

    export let sessionDetails: {
        date: string,
        withName: string,
        score: number,
        details: string,
        id: number,
        as: string
    };

    export let withDetail = false;
</script>

<style>
    .finishedSessionDetail > .grid:first-child {
        margin-bottom: 20px;
    }
</style>

<div class="finishedSessionDetail">
    <div class="grid">
        <TextGroup identifier="session-date" labelSlug="sessionDate" text={sessionDetails.date}/>
        <TextGroup identifier="session-mentor" labelSlug={`session.as.${sessionDetails.as}`} text={sessionDetails.withName} />
    </div>
    <div class="grid">
        <TextGroup identifier="session-review-score" labelSlug="sessionReviewScore" text={sessionDetails.score ? sessionDetails.score.toString() : $_("notYetEvaluated")} />
        <TextGroup identifier="session-review-details" labelSlug="sessionReviewDetails" text={sessionDetails.details ?? ""} />
    </div>

    {#if withDetail}    
        <button type="button" class="outline" on:click={() => {
            window.location.href =  `/sessions/${sessionDetails.id}`;
        }}>{$_("openSessionDetails")}</button>
    {/if}
</div>