<script lang="ts">
	import { enhance } from '$app/forms';
    import { _ } from 'svelte-i18n'
	import FormGroup from '../../components/form/formGroup.svelte';
    import type { ActionData } from './$types'

    export let form: ActionData;
</script>

<form method="POST" action="?/login" use:enhance>

    <FormGroup name="email" labelSlug="login.email" error={form?.errors?.email} type="email" autocomplete="email" />

    <FormGroup name="password" labelSlug="login.password" error={form?.errors?.password} type="password" autocomplete="currrent-password"/>

    <button type="submit">{$_("login.submit")}</button>

    {#if form?.serverErrors}
        {#each form?.serverErrors as serverError}
            <p>
                {$_(serverError)}
            </p>
        {/each}
    {/if}
</form>