<script lang="ts">
	import { page } from '$app/stores';
    import { _ } from 'svelte-i18n'
</script>

<style>
    nav {
        padding: 15px 20px;
        height: 100px;
    }

    .inline-form-action {
        margin: 0;
    }
</style>   

<nav>
    <ul>
        <li>
            <strong>{$_("siteTitle")}</strong>
        </li>
    </ul>
    
    <ul>
        <li>
            <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="link" class="secondary">{$_("menu")}</summary>
                <ul role="listbox">
                    {#if $page.data.user}
                        <li>
                            <h6>
                                {$page.data.user.firstName}
                            </h6>
                        </li>
                    {/if}
                    <li>
                        <a href="/register">{$_("createUser")}</a>
                    </li>
                    <li>
                        {#if $page.data.user}
                            <form action="/logout" method="POST" class="inline-form-action">
                                <button type="submit">{$_("logout")}</button>
                            </form>
                        {:else}
                            <a href="/login">{$_("login")}</a>
                        {/if}
                    </li>
                </ul>
              </details>
        </li>
    </ul>
</nav>