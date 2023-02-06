<script lang="ts">
    import { _ } from 'svelte-i18n'

    export let labelSlug: string;
    export let error: string | undefined;
    export let inputType: string = "text";
    export let inputName: string;
</script>
<div class="form-group">
    <label for={inputName}>{$_(labelSlug)}</label>
    <input name={inputName} type={inputType} aria-invalid={!!error ? true : undefined}/>
    {#if error}
        <p class="error">
            {$_(`${labelSlug}.${error}`)}
        </p>
    {/if}
</div>