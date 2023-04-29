<script lang="ts">
	import { _ } from "svelte-i18n";
	import { closeDialog, openDialog } from "../../utils/dialog";
	import TextArea from "../../components/form/textArea.svelte";
	import { enhance } from "$app/forms";    
    import Tags from "svelte-tags-input";
	import FormGroup from "../../components/form/formGroup.svelte";
	import { invalidate } from "$app/navigation";
	import type { PageData } from "./$types";
	import moment from "moment";

    export let resetForm = () => {
        const form = document.getElementById("createAchievementForm") as HTMLFormElement;
        form.reset();
        mentorsParticipated = []
    }

    export const CREATE_ACHIEVEMENT_DIALOG = "createAchievementDialog";
    export let mentorsParticipated: string[] = [];
    
    export let data: PageData;
</script>

<style>
    #createAchievementDialogContainer {
        min-width: 800px;
        max-width: 100%;
    }

    .form-group {
        margin-bottom: var(--spacing)
    }
    .achievement-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, 350px);
        column-gap: 20px;
        row-gap: 40px;
    }
    .achievement-list > li {
        list-style-type: none;
        padding: 25px 40px;
        border: 1px solid var(--secondary);
        border-radius: 10px;
    }
    .achievement-title {
        font-weight: bold;
        margin-bottom: 10px;   
    }
</style>

<section>
    <button class="outline" type="button" on:click={() => {openDialog(CREATE_ACHIEVEMENT_DIALOG)}}>{$_("createAchievement")}</button>

    <dialog id={CREATE_ACHIEVEMENT_DIALOG}>
        <form action="?/createAchievement" method="POST" id="createAchievementForm" use:enhance={() => {
            return  ({ result, update }) => {
                if(result.type === "success") {
                    invalidate('app:achievements');
                    closeDialog(CREATE_ACHIEVEMENT_DIALOG);
                    resetForm();
                } else {
                    update()
                }
            }}}>
            <article id="createAchievementDialogContainer">
                <header>
                    {$_("createAchievement")}
                </header>
                
                <TextArea name="description" labelSlug="achievementDescription" />
                
                <div class="form-group">
                    <label for="mentorsParticipated">{$_('mentorParticipatedOnAchievement')}</label>

                    <Tags 
                        name="mentorsParticipated"
                        bind:tags={mentorsParticipated}
                        onlyUnique="true"
                    />
                </div>
                
                <input type="hidden" bind:value={mentorsParticipated} name="mentorsParticipatedValue">

                <FormGroup labelSlug="achievedDate" name="achievedDate" type="date"/>

                <footer>
                    <button type="submit">{$_("send")}</button>
    
                    <button class="outline" type="button" on:click={() => {closeDialog(CREATE_ACHIEVEMENT_DIALOG)}}>{$_("close")}</button>
                </footer>
            </article>  
        </form>
    </dialog>
    
    <article>
        <details>
            <summary>
                {$_("myAchievements")}
            </summary>
            <ul class="achievement-list">
                {#each data.achieved as achieved}
                    <li>
                        <div class="achievement-title">
                            {achieved.description}
                        </div>
                        <div>
                            {$_("mentorsHelped")}
                        </div>
                        <ul class="achievement-participants">
                            {#each achieved.mentorsParticipated as mentor}
                                <li>{mentor}</li>
                            {/each}
                        </ul>
                        <div>
                            {$_("achievedWhen", {values: {date: moment.utc(achieved.achievedDate).format("DD/MM/YYYY")}})}
                        </div>
                    </li>
                {/each}
            </ul>
        </details>
    </article>

    <article>
        <details>
            <summary>
                {$_("menteesAchievements")}
            </summary>
            
            <ul class="achievement-list">
                {#each data.participated as participated}
                    <li>
                        <div class="achievement-title">
                            {participated.description}
                        </div>
                        <div>
                            {$_("helped", { values: { mentee: participated.mentee }})}
                        </div>
                        <div>
                            {$_("achievedWhen", {values: {date: moment.utc(participated.achievedDate).format("DD/MM/YYYY")}})}
                        </div>
                    </li>
                {/each}
            </ul>
        </details>
    </article>
</section>