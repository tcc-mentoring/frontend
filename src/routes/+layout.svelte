<script>
    import '@picocss/pico/css/pico.css';
    

    import { addMessages, init } from 'svelte-i18n';
    import pt from '../locale/pt.json';

    addMessages("pt", pt);

    init({
        fallbackLocale: "pt",
        initialLocale: "pt"
    });
</script>

<slot></slot>