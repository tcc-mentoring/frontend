<script lang="ts">
    import { page } from '$app/stores'
</script>



{#if $page.data.user}
    Logged in user: {$page.data.user.email}
{/if}