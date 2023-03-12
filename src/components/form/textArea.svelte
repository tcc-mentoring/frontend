<script lang="ts">
    import { _ } from 'svelte-i18n'

    export let labelSlug: string;
    export let error: string | undefined = undefined ;
    export let name: string;
    export let extraProperties = {}
</script>
<div class="form-group">
    <label for={name}>{$_(labelSlug)}</label>
    <textarea {name} aria-invalid={!!error ? true : undefined} {...extraProperties}/>
    {#if error}
        <p class="error">
            {$_(`${labelSlug}.${error}`)}
        </p>
    {/if}
</div>