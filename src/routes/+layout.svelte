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
.page-content {
    padding: 0 20px;
}
</style>

<Navbar />

<div class="page-content">
    <slot></slot>
</div>