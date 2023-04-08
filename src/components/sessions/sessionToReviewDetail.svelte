<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import TextGroup from '../commons/textGroup.svelte';
	import FormGroup from '../form/formGroup.svelte';
	import TextArea from '../form/textArea.svelte';

	export let sessionDetails: {
		date: string;
		mentorName: string;
		id: number;
	};
</script>

<div class="sessionToReviewDetail">
	<div class="grid">
		<TextGroup identifier="session-date" labelSlug="sessionDate" text={sessionDetails.date} />
		<TextGroup
			identifier="session-mentor"
			labelSlug="sessionsMentor"
			text={sessionDetails.mentorName}
		/>
	</div>

	<form
		action="?/reviewSession"
		method="POST"
		use:enhance={() => {
			return ({ result, update }) => {
				if (result.type === 'success') {
                    invalidateAll()
					invalidate('app:sessions');
				} else {
					update();
				}
			};
		}}
	>
		<div class="grid">
			<FormGroup
				name="sessionReviewScore"
				labelSlug="sessionReviewScore"
				type="number"
				extraProperties={{ min: '0', max: '10' }}
				error={undefined}
			/>
			<TextArea
				name="sessionReviewDetails"
				labelSlug="sessionReviewDetails"
				extraProperties={{ rows: 1 }}
				error={undefined}
			/>
		</div>

		<input type="hidden" name="scheduleId" value={sessionDetails.id} />
		<button type="submit">{$_('submitReview')}</button>
	</form>
</div>

<style>
	.sessionToReviewDetail > .grid:first-child {
		margin-bottom: 20px;
	}
</style>
