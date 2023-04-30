<script lang="ts">
	import { _ } from "svelte-i18n";

    export let mentorProfile: {user: {email: string, firstName: string, lastName: string}, specialties: string[], knowledgeArea: string};
    export let onScheduleClick: (mentorProfile: any) => void;
</script>

<style>
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
    #knowledgeArea {
        margin-bottom: 20px;
    }
</style>

<article>
    <header>
        {mentorProfile.user.firstName} {mentorProfile.user.lastName} <br/>
        ({mentorProfile.user.email})
    </header>

    <div id="knowledgeArea">
        {$_("mentorProfileKnowledgeArea")}: <div>{$_(`knowledgeAreas.${mentorProfile.knowledgeArea}`)}</div>
    </div>
    
    <div id="specialtiesList">
        {$_("mentorProfileSpecialtiesList")}
        <ul class="specialties">
            {#each mentorProfile.specialties as specialty}
                <li>{specialty}</li>
            {/each}
        </ul>
    </div>

    <footer>
        <button class="outline" on:click={() => {onScheduleClick(mentorProfile)}}>{$_("scheduleSession")}</button>
    </footer>
</article>