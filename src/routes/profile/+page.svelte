<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { page } from '$app/stores';
	import type { PageData } from './$types';

    export let data: PageData;
</script>


<h4>{$page.data.user.firstName}&nbsp;{$page.data.user.lastName}</h4>

<div>
    <h5>{$_("ocupations")}</h5>
    <ul>
        {#if data.userProfile.ocupations.length === 0}
            <li>{$_("noOcupations")}</li>
        {/if}
        {#each data.userProfile.ocupations as ocupation}
            <li>
                {ocupation.description}
            </li>
        {/each}
    </ul>
</div>

<div>
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
</div>