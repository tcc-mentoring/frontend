<script lang="ts">
	import { enhance } from '$app/forms';
    import { _ } from 'svelte-i18n'
	import FormGroup from '../../components/form/formGroup.svelte';
    import type { ActionData } from './$types'

    export let form: ActionData;
</script>

<form method="POST" action="?/register" use:enhance>

    <FormGroup inputName="firstName" labelSlug="createUser.firstName" error={form?.errors?.firstName}/>

    <FormGroup inputName="lastName" labelSlug="createUser.lastName" error={form?.errors?.lastName}/>

    <FormGroup inputName="email" labelSlug="createUser.email" error={form?.errors?.email} inputType="email" />

    <FormGroup inputName="password" labelSlug="createUser.password" error={form?.errors?.password} inputType="password" />

    <FormGroup inputName="confirmPassword" labelSlug="createUser.confirmPassword" error={form?.errors?.confirmPassword} inputType="password" />

    <button type="submit">{$_("createUser.submit")}</button>

    {#if form?.serverErrors}
        {#each form?.serverErrors as serverError}
            <p>
                {$_(serverError)}
            </p>
        {/each}
    {:else if form?.success}
        {$_("userCreationSuccess")}
    {/if}

</form>