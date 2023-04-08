<script lang="ts">
	import { enhance } from "$app/forms";
	import { _ } from "svelte-i18n";
	import FormGroup from "../components/form/formGroup.svelte";
    import MentorCard from "../components/mentor/mentorCard.svelte";
	import type { MentorProfile } from "../validators/mentorProfileValidator";
	import type { PageData } from "./$types";

    export let data: PageData;

    let {mentorProfiles} = data;
    let mentorProfileToSchedule: MentorProfile = {} as MentorProfile;

    let openScheduleSessionDialog = (mentorProfile: MentorProfile) => {
        mentorProfileToSchedule = mentorProfile;
        const scheduleSessionDialog = document.getElementById("scheduleSessionDialog");
        if (scheduleSessionDialog) {
            scheduleSessionDialog.setAttribute("open", "true");
        }
    }

    let closeScheduleSessionDialog = () => {
        const scheduleSessionDialog = document.getElementById("scheduleSessionDialog");
        if (scheduleSessionDialog) {
            scheduleSessionDialog.setAttribute("open", "false");
        }   
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

    <dialog id="scheduleSessionDialog">
        {#if !!mentorProfileToSchedule && !!mentorProfileToSchedule.user}
            <form action="?/scheduleSession" method="POST" use:enhance>
                <article>
                    <header>
                        {$_("scheduleSessionWith", { values: {
                            ...mentorProfileToSchedule.user
                        } })}
                    </header>

                    <input type="hidden" name="menthorEmail" bind:value={mentorProfileToSchedule.user.email}>
                    <FormGroup labelSlug="scheduleSession.date" name="startDatetime" type="datetime-local" extraProperties={{step: (60*30)}}/>

                    <footer>
                        <button type="submit">{$_("send")}</button>

                        <button class="outline" type="button" on:click={() => {closeScheduleSessionDialog()}}>{$_("close")}</button>
                    </footer>
                </article>
            </form>
        {/if}
    </dialog>
</section>