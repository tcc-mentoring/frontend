<script lang="ts">
    import { _ } from 'svelte-i18n'

    export let labelSlug: string;
    export let error: string | undefined;
    export let type: string = "text";
    export let name: string;
    export let autocomplete: string = "off";
</script>
<div class="form-group">
    <label for={name}>{$_(labelSlug)}</label>
    <input {name} {type} aria-invalid={!!error ? true : undefined} {autocomplete}/>
    {#if error}
        <p class="error">
            {$_(`${labelSlug}.${error}`)}
        </p>
    {/if}
</div>