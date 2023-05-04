<script lang="ts">
	import TextGroup from "../commons/textGroup.svelte";

    export let sessionDetails: {
		date: string;
		mentorName: string;
        as: "mentor" | "mentee"
    };
</script>
<div class="grid">
    <TextGroup identifier="session-date" labelSlug="sessionDate" text={sessionDetails.date} />
    <TextGroup
        identifier="session-mentor"
        labelSlug={sessionDetails.as === "mentee" ? "sessionsMentor" : "sessionsMentee"}
        text={sessionDetails.mentorName}
    />
</div>
