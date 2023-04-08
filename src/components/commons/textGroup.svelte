<script lang="ts">
    import { _ } from "svelte-i18n";

    export let identifier: string;
    export let labelSlug: string;
    export let text: string;
</script>

<div class="text-group">
    <label for={identifier}>
        {$_(labelSlug)}
    </label>
    <div id={identifier}>
        {text}
    </div>
</div>