<script lang="ts">
	import { _ } from "svelte-i18n";
	import type { PageData } from "./$types";
	import TextGroup from "../../../components/commons/textGroup.svelte";
	import moment from "moment";
	import { enhance } from "$app/forms";
	import { invalidate } from "$app/navigation";
    import { page } from '$app/stores';
	import Tiptap from "../../../components/commons/tiptap.svelte";
    import { toast } from '@zerodevx/svelte-toast'

    export let data: PageData;
    export let editedValue = data.session.mentorNotes;
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
    .action-row {
        margin-top: 20px;
    }
</style>

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
            <form id="update-mentor-notes-form" action="?/updateMentorNotes" method="POST" use:enhance={() => {
                return  ({ result, update }) => {
                    if(result.type === "success") {
                        invalidate('app:session');
                        toast.push($_("updatedNotes"))
                    } else {
                        update()
                    }
                }
            }}>
                <label for="mentorNotes">
                    {$_("mentorNotes")}
                </label>
                <input type="hidden" name="updatedMentorNotes" bind:value={editedValue}>
                <input type="hidden" name="scheduleId" value={data.session.id} />
                <Tiptap bind:startContent={editedValue} editable={$page.data.user.email === data.session.mentor.email}/>
                {#if $page.data.user.email === data.session.mentor.email}  
                    <input type="submit" role="button" value={$_("updateMentorNotes")}/> 
                {/if}
            </form>
        </div>
    </div>
</section>

