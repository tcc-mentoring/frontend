<script lang="ts">
    import { _ } from 'svelte-i18n'
	import TextGroup from '../commons/textGroup.svelte';

    export let sessionDetails: {
        date: string,
        withName: string,
        id: number,
        as: string
    };
</script>

<style>
    .upcomingSessionDetail > .grid:first-child {
        margin-bottom: 20px;
    }
</style>

<div class="upcomingSessionDetail">
    <div class="grid">
        <TextGroup identifier="session-date" labelSlug="sessionDate" text={sessionDetails.date}/>
        <TextGroup identifier="session-mentor" labelSlug={`session.as.${sessionDetails.as}`} text={sessionDetails.withName} />
    </div>
    <button type="button" class="outline" on:click={() => {
        window.location.href =  `/sessions/${sessionDetails.id}`;
    }}>{$_("openSessionDetails")}</button>
</div>