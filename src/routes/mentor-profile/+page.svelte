<script lang="ts">
    import Tags from "svelte-tags-input";
	import { enhance } from '$app/forms';
    import { _ } from 'svelte-i18n'
    import type { PageData } from './$types';
	import TextArea from '../../components/form/textArea.svelte';

    export let data: PageData;

    export let {mentorNotRegistered, mentorProfile} = data;
    export let specialties: string[] = [];

</script>

<style>
    .submit-profile-information {
        margin-top: 20px;
    }
</style>

<section>
    <h2>
        {$_("mentorProfile")}
    </h2>

    {#if mentorNotRegistered}
        <form action="?/mentorRegister" method="POST" use:enhance>
            <TextArea name="selfDescription" labelSlug="mentorProfileSelfDescription"  error={undefined}/>

            <div class="form-group">
                <label for="knowledgeArea">{$_('mentorProfileKnowledgeArea')}</label>
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
            </div>

            <div class="form-group">
                <label for="specialties">{$_('mentorProfileSpecialties')}</label>

                <Tags 
                    name="specialties"
                    bind:tags={specialties}
                    onlyUnique="true"
                />
            </div>


            <input type="hidden" bind:value={specialties} name="specialties-value">
                
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