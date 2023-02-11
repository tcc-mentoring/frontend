<script lang="ts">
    import { page } from '$app/stores'
</script>

<nav>
    <ul>
        <li>
            <strong>Mentoring</strong>
        </li>
    </ul>
    <ul>
        <li>
            <a href="/register">Create new user</a>
        </li>
        <li>
            {#if $page.data.user}
                <form action="/logout" method="POST">
                    <button type="submit">Logout</button>
                </form>
            {:else}
                <a href="/login">Login</a>
            {/if}
        </li>
    </ul>
</nav>

{#if $page.data.user}
    Logged in user: {$page.data.user.email}
{/if}