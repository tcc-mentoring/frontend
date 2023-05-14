<script lang="ts">
	import { enhance } from "$app/forms";
	import { _ } from "svelte-i18n";
	import FormGroup from "../components/form/formGroup.svelte";
    import MentorCard from "../components/mentor/mentorCard.svelte";
	import type { MentorProfile } from "../validators/mentorProfileValidator";
	import type { PageData } from "./$types";
	import { closeDialog, openDialog } from "../utils/dialog";

    export let data: PageData;

    const SCHEDULE_SESSION_DIALOG_ID = "scheduleSessionDialog";

    let {mentorProfiles} = data;
    let mentorProfileToSchedule: MentorProfile = {} as MentorProfile;

    let openScheduleSessionDialog = (mentorProfile: MentorProfile) => {
        mentorProfileToSchedule = mentorProfile;
        openDialog(SCHEDULE_SESSION_DIALOG_ID);
    }
</script>

<style>
    .mentor-profiles {
        display: grid;
        grid-template-columns: repeat(auto-fill, 350px);
        column-gap: 20px;
    }
</style>

<section class="mentor-profiles">
    {#each mentorProfiles as mentorProfile}
        <MentorCard {mentorProfile} onScheduleClick={openScheduleSessionDialog}/>
    {/each}

    <dialog id={SCHEDULE_SESSION_DIALOG_ID}>
        {#if !!mentorProfileToSchedule && !!mentorProfileToSchedule.user}
            <form action="?/scheduleSession" method="POST" use:enhance>
                <article>
                    <header>
                        {$_("scheduleSessionWith", { values: {
                            ...mentorProfileToSchedule.user
                        } })}
                    </header>

                    <input type="hidden" name="menthorEmail" bind:value={mentorProfileToSchedule.user.email}>
                    <FormGroup labelSlug="scheduleSession.date" name="startDatetime" type="datetime-local" />

                    <footer>
                        <button type="submit">{$_("send")}</button>

                        <button class="outline" type="button" on:click={() => {closeDialog(SCHEDULE_SESSION_DIALOG_ID)}}>{$_("close")}</button>
                    </footer>
                </article>
            </form>
        {/if}
    </dialog>
</section>