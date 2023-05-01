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
    export let stillStudying = false;
</script>

<style>

    .profile-information-form-layout {
        display: flex;
        flex-direction: column;
    }

    .submit-profile-information {
        margin-top: 20px;
    }

</style>

<section>
    <h2>{$page.data.user.firstName}&nbsp;{$page.data.user.lastName}</h2>
    
    <div class="grid">
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
                            "fromToDateDisplay" : 
                            "sinceDisplay", 
                            {values: {
                                startDate: moment.utc(ocupation.startDate).format("DD/MM/YYYY"),
                                endDate: moment.utc(ocupation.endDate).format("DD/MM/YYYY")
                            }})} 
                    </li>
                {/each}
            </ul>
            <details>
                <summary>
                    {$_("ocupationAddTitle")}
                </summary>
                <form method="POST" action="?/ocupation" class="profile-information-form-layout" use:enhance>          
                    <FormGroup name="description" labelSlug="ocupationDescription" error={form?.errors?.description}/>    
                    <FormGroup name="company" labelSlug="ocupationCompany" error={form?.errors?.institution}/>  
        
                    <div class="grid">
                        <FormGroup name="startDate" labelSlug="ocupationStartDate" type="date" error={form?.errors?.startDate}/>
                        <FormGroup name="endDate" labelSlug="ocupationEndDate" type="date" error={form?.errors?.endDate} extraProperties={{disabled: stillWork}}/>
                    </div>
                    
                    <InputCheckbox name="stillWorking" labelSlug="ocupationStillWorking" bind:checked={stillWork}/>
    
                    <button class="submit-profile-information" type="submit">{$_("saveOcupation")}</button>
                </form>
            </details>
        </article>
        
        <article>
            <h5>{$_("academyEntries")}</h5>
            <ul>
                {#if data.userProfile.academyEntries.length === 0}
                    <li>{$_("noAcademyEntries")}</li>
                {/if}
                {#each data.userProfile.academyEntries as academyEntry}
                <li>
                    {$_("academyEntryDisplay", {values: {...academyEntry}})}
                    {$_(!!academyEntry.endDate ? 
                        "fromToDateDisplay" : 
                        "sinceDisplay", 
                        {values: {
                            startDate: moment.utc(academyEntry.startDate).format("DD/MM/YYYY"),
                            endDate: moment.utc(academyEntry.endDate).format("DD/MM/YYYY")
                        }})} 
                </li>
                {/each}
            </ul>
            <details>
                <summary>
                    {$_("academyEntryAddTitle")}
                </summary>
                <form method="POST" action="?/academyEntry" class="profile-information-form-layout" use:enhance>          
                    <FormGroup name="course" labelSlug="academyEntryCourse" error={form?.errors?.course}/>    
                    <FormGroup name="institution" labelSlug="academyEntryInstitution" error={form?.errors?.institution}/>  
        
                    <div class="grid">
                        <FormGroup name="startDate" labelSlug="academyEntryStartDate" type="date" error={form?.errors?.startDate}/>
                        <FormGroup name="endDate" labelSlug="academyEntryEndDate" type="date" error={form?.errors?.endDate} extraProperties={{disabled: stillStudying}}/>
                    </div>
                    
                    <InputCheckbox name="stillStudying" labelSlug="academyEntryStillStudying" bind:checked={stillStudying}/>
    
                    <button class="submit-profile-information" type="submit">{$_("saveAcademyEntry")}</button>
                </form>
            </details>
        </article>
    </div>
</section>


