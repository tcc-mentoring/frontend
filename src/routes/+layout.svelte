<script>
	import { page } from '$app/stores';
    import '@picocss/pico/css/pico.css';
    

    import { addMessages, init } from 'svelte-i18n';
	import Navbar from '../components/navbar/navbar.svelte';
    import pt from '../locale/pt.json';

    addMessages("pt", pt);

    init({
        fallbackLocale: "pt",
        initialLocale: "pt"
    });
</script>

<style>
.layout-content {
    padding: 5px 20px;
    margin-top: var(--nav-height);
}
</style>

<Navbar />

<div class="layout-content">
    <slot></slot>
</div>