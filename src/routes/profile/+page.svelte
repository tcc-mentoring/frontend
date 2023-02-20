<script lang="ts">
    import { enhance } from '$app/forms';
    import { _ } from 'svelte-i18n'
    import { page } from '$app/stores';
	import type { ActionData, PageData } from './$types';
	import FormGroup from '../../components/form/formGroup.svelte';
	import InputCheckbox from '../../components/form/inputCheckbox.svelte';
	import moment from 'moment';

    export let form: ActionData;
    export let data: PageData;

	export let stillWork = false;
</script>

<style>

    .ocupation-form-layout {
        display: flex;
        flex-direction: column;
    }

    .submit-ocupation {
        margin-top: 20px;
    }

</style>

<h4>{$page.data.user.firstName}&nbsp;{$page.data.user.lastName}</h4>

<section class="grid">
    <article>
        <h5>{$_("ocupations")}</h5>
        <ul>
            {#if data.userProfile.ocupations.length === 0}
                <li>{$_("noOcupations")}</li>
            {/if}
            {#each data.userProfile.ocupations as ocupation}
                <li>
                    {$_("ocupationDisplay", {values: {...ocupation}})}
                    {$_(!!ocupation.endDate ? 
                        "ocupationFromToDateDisplay" : 
                        "ocupationSinceDisplay", 
                        {values: {
                            startDate: moment(ocupation.startDate).format("DD/MM/YYYY"),
                            endDate: moment(ocupation.endDate).format("DD/MM/YYYY")
                        }})} 
                </li>
            {/each}
        </ul>
        <div>
            <details>
                <summary>
                    {$_("ocupationAddTitle")}
                </summary>
                <form method="POST" action="?/ocupation" class="ocupation-form-layout" use:enhance>          
                    <FormGroup name="description" labelSlug="ocupationDescription" error={form?.errors?.description}/>    
                    <FormGroup name="company" labelSlug="ocupationCompany" error={form?.errors?.company}/>  
        
                    <div class="grid">
                        <FormGroup name="startDate" labelSlug="ocupationStartDate" type="date" error={form?.errors?.startDate}/>
                        <FormGroup name="endDate" labelSlug="ocupationEndDate" type="date" error={form?.errors?.endDate} extraProperties={{disabled: stillWork}}/>
                    </div>
                    
                    <InputCheckbox name="stillWorking" labelSlug="ocupationStillWorking" bind:checked={stillWork}/>
    
                    <button class="submit-ocupation" type="submit">{$_("saveOcupation")}</button>
                </form>
            </details>
        </div>


    </article>
    
    <article>
        <h5>{$_("academyEntries")}</h5>
        <ul>
            {#if data.userProfile.academyEntries.length === 0}
                <li>{$_("noAcademyEntries")}</li>
            {/if}
            {#each data.userProfile.academyEntries as academyEntry}
                <li>
                    {academyEntry.course}
                </li>
            {/each}
        </ul>
    </article>
</section>
