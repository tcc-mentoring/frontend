<script lang="ts">
	import { page } from '$app/stores';
    import { _ } from 'svelte-i18n'
</script>

<style>
    nav {
        background: var(--primary-inverse);
        padding: 15px 20px;
        height: var(--nav-height);
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 999;
    }

    .inline-form-action {
        margin: 0;
    }
</style>   

<nav>
    <ul>
        <li>
            <a href="/">
                <strong>{$_("siteTitle")}</strong>
            </a>
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
                        <li>
                            <a href="/mentor-profile">{$_("mentorProfile")}</a>
                        </li>
                        <li>
                            <a href="/profile">{$_("profile")}</a>
                        </li>
                        <li>
                            <a href="/calendar">{$_("calendar")}</a>
                        </li>
                        <li>
                            <form action="/logout" method="POST" class="inline-form-action">
                                <button type="submit">{$_("logout")}</button>
                            </form>
                        </li>
                    {:else}
                        <li>
                            <a href="/register">{$_("createUser")}</a>
                        </li>
                        <li>
                            <a href="/login">{$_("login")}</a>
                        </li>
                    {/if}
                </ul>
              </details>
        </li>
    </ul>
</nav>