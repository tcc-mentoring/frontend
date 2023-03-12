<script lang="ts">
	import { enhance } from "$app/forms";
	import { _ } from "svelte-i18n";
	import FormGroup from "../components/form/formGroup.svelte";
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
    .specialties {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    .specialties > li {
        list-style-type: none;
        background: var(--primary);
        color: var(--primary-inverse);
        font-size: 12px;
        float: left;
        margin-right: 10px;
        padding: 5px 10px;
        border-radius: 3px
    }
</style>

<section class="mentor-profiles">
    {#each mentorProfiles as mentorProfile}
        <article>
            <header>
                {mentorProfile.user.email}
            </header>
            
            {$_("mentorProfileSpecialtiesList")}
            
            <ul class="specialties">
                {#each mentorProfile.specialties as specialty}
                    <li>{specialty}</li>
                {/each}
            </ul>
            
            <footer>
                <button class="outline" on:click={() => {openScheduleSessionDialog(mentorProfile)}}>{$_("scheduleSession")}</button>
            </footer>
        </article>
    {/each}

    <dialog id="scheduleSessionDialog">
        {#if !!mentorProfileToSchedule && !!mentorProfileToSchedule.user}
            <form action="?/scheduleSession" use:enhance>
                <article>
                    <header>
                        {$_("scheduleSessionWith", { values: {
                            ...mentorProfileToSchedule.user
                        } })}
                    </header>

                    <input type="hidden" name="menthor" bind:value={mentorProfileToSchedule.user.email}>
                    <FormGroup labelSlug="scheduleSession.date" name="date" type="datetime-local"/>

                    <footer>
                        <button type="submit">{$_("send")}</button>

                        <button class="outline" on:click={() => {closeScheduleSessionDialog()}}>{$_("close")}</button>
                    </footer>
                </article>
            </form>
        {/if}
    </dialog>
</section>