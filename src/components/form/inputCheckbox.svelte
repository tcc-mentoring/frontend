<script lang="ts">
    import { _ } from 'svelte-i18n'

    export let labelSlug: string;
    export let name: string;
    export let checked: boolean;

</script>
<div class="form-group">
    <input type="checkbox" {name} bind:checked={checked}/>
    <label for={name}>{$_(labelSlug)}</label>
</div>

