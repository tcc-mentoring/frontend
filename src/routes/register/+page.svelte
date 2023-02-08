<script lang="ts">
	import { enhance } from '$app/forms';
    import { _ } from 'svelte-i18n'
	import FormGroup from '../../components/form/formGroup.svelte';
    import type { ActionData } from './$types'

    export let form: ActionData;
</script>

<form method="POST" action="?/register" use:enhance>

    <FormGroup name="firstName" labelSlug="createUser.firstName" error={form?.errors?.firstName} autocomplete="given-name"/>

    <FormGroup name="lastName" labelSlug="createUser.lastName" error={form?.errors?.lastName} autocomplete="family-name"/>

    <FormGroup name="email" labelSlug="createUser.email" error={form?.errors?.email} type="email" autocomplete="email" />

    <FormGroup name="password" labelSlug="createUser.password" error={form?.errors?.password} type="password" autocomplete="new-password"/>

    <FormGroup name="confirmPassword" labelSlug="createUser.confirmPassword" error={form?.errors?.confirmPassword} type="password" autocomplete="new-password" />

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