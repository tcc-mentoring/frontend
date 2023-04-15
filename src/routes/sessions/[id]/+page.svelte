<script lang="ts">
	import { _ } from "svelte-i18n";
	import type { PageData } from "./$types";
    import {quill} from "svelte-quill";
	import TextGroup from "../../../components/commons/textGroup.svelte";
	import moment from "moment";
	import { enhance } from "$app/forms";
	import { invalidate } from "$app/navigation";
    import { page } from '$app/stores';

    let options = { placeholder: $_("insertMentorNotes"),  theme: "snow" }
	let content = { html: '', text: ''};
	
    let updateContent = (e: any) => content = e.detail;
  
    let toggleMentorNotesEditor = (e: any) => {
        e.preventDefault();
        const {form, mentorNotesContainer} = getFormAndMentorNotes();

        form?.classList.remove("hidden");
        mentorNotesContainer?.classList.add("hidden"); 
    }

    let toggleMentorNotesView = (e?: any) => {
        e?.preventDefault();
        const {form, mentorNotesContainer} = getFormAndMentorNotes();

        form?.classList.add("hidden");
        mentorNotesContainer?.classList.remove("hidden"); 
    }

    let getFormAndMentorNotes = () => {
        const form = document.getElementById("update-mentor-notes-form");
        const mentorNotesContainer = document.getElementById("current-mentor-notes-container");

        return {form, mentorNotesContainer}
    }

    export let data: PageData;
</script>

<style>
    #mentorNotes {
        border: 1px solid var(--primary);
        border-radius: 5px;
        padding: 15px 35px;
    }
    #mentor-notes-container {
        margin-top: 20px;
    }
    .quill-editor {
        height: 400px
    }
    .action-row {
        margin-top: 20px;
    }
</style>
<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">


<section>
    <h3> {$_("isMentoring", {
        values: {
            mentor: data.session.mentor.firstName,
            mentee: data.session.mentee.firstName
        }
    })}</h3>
        
    <TextGroup identifier="session-date" labelSlug="sessionDate" text={moment.utc(data.session.startDateTime).format("DD/MM/YYYY HH:mm")} />
    <div id="mentor-notes-container">
        <div id="current-mentor-notes-container" class="text-group">
            <label for="mentorNotes">
                {$_("mentorNotes")}
            </label>
            <div id="mentorNotes">
                {@html data.session.mentorNotes}
            </div>
            {#if $page.data.user.email === data.session.mentor.email}  
                <button class="action-row" on:click={toggleMentorNotesEditor}>{$_("updateMentorNotes")}</button>
            {/if}
        </div>
        <form id="update-mentor-notes-form" class="hidden" action="?/updateMentorNotes" method="POST" use:enhance={() => {
            return  ({ result, update }) => {
                if(result.type === "success") {
                    invalidate('app:session');
                    toggleMentorNotesView();
                } else {
                    update()
                }
            }}}>
            <div 
                class="quill-editor" 
                use:quill={options} 
                on:text-change={updateContent}
            >
                {@html data.session.mentorNotes}
            </div>

            <input type="hidden" name="updatedMentorNotes" value={content.html}>
            <input type="hidden" name="scheduleId" value={data.session.id} />

            <div class="grid action-row">
                <input type="submit" role="button" value={$_("updateMentorNotes")}/>          
                <button class="outline" on:click={toggleMentorNotesView}>{$_("cancel")}</button>
            </div>
        </form>
    </div>

    
</section>

