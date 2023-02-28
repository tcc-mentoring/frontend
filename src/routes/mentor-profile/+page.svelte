<script lang="ts">
	import { enhance } from '$app/forms';
    import { _ } from 'svelte-i18n'
    import type { PageData } from './$types';
	import TextArea from '../../components/form/textArea.svelte';

    export let data: PageData;

    export let {mentorNotRegistered, mentorProfile} = data;
</script>

<section>
    <h2>
        {$_("mentorProfile")}
    </h2>

    {#if mentorNotRegistered}
        <form action="?/mentorRegister" method="POST" use:enhance>
            <TextArea name="selfDescription" labelSlug="mentorProfileSelfDescription"  error={undefined}/>

            <label for="knowledgeArea">{$_('knowledgeArea')}</label>
            <select name="knowledgeArea" required>
                <option value="BIO">BIO</option>
                <option value="ENG">ENG</option>
                <option value="SAU">SAU</option>
                <option value="AGR">AGR</option>
                <option value="LIT">LIT</option>
                <option value="SOC">SOC</option>
                <option value="HUM">HUM</option>
                <option value="EXA">EXA</option>
            </select>
 
            <button class="submit-profile-information" type="submit">{$_("saveOcupation")}</button>

        </form>
    {:else}
        <article>
            <div>{mentorProfile.selfDescription}</div>
            <div>{mentorProfile.knowledgeArea}</div>
            <ul>
                {#each mentorProfile.specialties as specialty}
                    <li>{specialty}</li>
                {/each}
            </ul>
        </article>
    {/if}
    
</section>