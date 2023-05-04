<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import FormGroup from '../form/formGroup.svelte';
	import TextArea from '../form/textArea.svelte';
	import SessionInformationDetail from './sessionInformationDetail.svelte';

	export let sessionDetails: {
		as: "mentor" | "mentee";
		date: string;
		mentorName: string;
		id: number;
	};
</script>

<div class="sessionToReviewDetail">
	<SessionInformationDetail {sessionDetails}/>

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
		<div class="grid">
			<button type="submit">{$_('submitReview')}</button>
			<button type="button" class="outline" on:click={() => {
				window.location.href =  `/sessions/${sessionDetails.id}`;
			}}>{$_("openSessionDetails")}</button>
		</div>
	</form>
</div>
