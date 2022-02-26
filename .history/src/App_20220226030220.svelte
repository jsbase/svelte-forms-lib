<script>
import logo from './assets/svelte.png'
import FormBasic from "./components/FormBasic.svelte"
import FormCustomValidation from "./components/FormCustomValidation.svelte"
import FormYupValidation from "./components/FormYupValidation.svelte"
import FormHelperComponents from "./components/FormHelperComponents.svelte"
</script>

<main>
  <img src={logo} alt="Svelte Logo" />

  <FormBasic />
  <FormCustomValidation />
  <FormYupValidation />
  <FormHelperComponents />
</main>

<style global>
:root {
  font-family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
}

:global(.form-error),
.error,
small {
    font-family: monospace;
    font-size: 12px;
    margin-top: 10px;
    display: block;
    color: var(--red);
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

img {
  height: 8rem;
  width: 8rem;
}

@media (min-width: 580px) {
  img {
    height: 4rem;
    width: 4rem;
  }
}
</style>
