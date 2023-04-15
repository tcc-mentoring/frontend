<script lang="ts">
	import TextGroup from "../commons/textGroup.svelte";

    export let sessionDetails: {
		date: string;
		mentorName: string;
    };
</script>
<div class="grid">
    <TextGroup identifier="session-date" labelSlug="sessionDate" text={sessionDetails.date} />
    <TextGroup
        identifier="session-mentor"
        labelSlug="sessionsMentor"
        text={sessionDetails.mentorName}
    />
</div>
