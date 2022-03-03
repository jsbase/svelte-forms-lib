<script>
  import logo from "./assets/svelte.png";
  import FormBasic from "./components/FormBasic.svelte";
  import FormHelperComponents from "./components/FormHelperComponents.svelte";
  import FormCustomValidation from "./components/FormCustomValidation.svelte";
  import FormYupValidation from "./components/FormYupValidation.svelte";
  import FormArray from "./components/FormArray.svelte";
</script>

<header>
  <img src={logo} alt="Svelte Logo" />
</header>

<main>
  <div class="container">
    <FormHelperComponents />
    <!-- <FormBasic />
    <FormCustomValidation />
    <FormYupValidation />
    <FormArray /> -->
  </div>
</main>

<style global type="text/css">
  :root {
    --primary-light: #a6f9d6;
    --primary: #5be2a9;
    --primary-dark: #308662;
    --secondary: #1e2145;
    --white: #fff;
    --grey: #e6e6ff;
    --grey-dark: #6d7098;
    --red: #ff6b6b;
    --border-width: 2px;
    --font-default: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  }
  :global(body, body *) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-default);
  }
  :global(button) {
    background-color: var(--primary);
    border: none;
    color: var(--white);
    cursor: pointer;
    letter-spacing: 1.8px;
    outline: none;
    border-radius: 4px;
    display: block;
    margin: 12px auto;
    line-height: 1.8;
    font-size: 12px;
    padding: 10px 18px;
    width: 100%;
    text-transform: uppercase;
    transition: ease-in-out;
  }
  :global(a) {
    color: var(--secondary);
    text-decoration: underline;
  }
  :global(a:hover, a:focus, a:active) {
    color: var(--primary-dark);
    text-decoration: none;
  }
  :global(button:disabled) {
    background-color: var(--grey);
  }
  :global(button:focus:not(:disabled)) {
    box-shadow: 0 0 0 4px var(--primary-light);
  }
  :global(button:hover:not(:disabled)) {
    background-color: var(--primary-dark);
  }
  :global(.form-field) {
    background-color: var(--white);
    box-sizing: border-box;
    padding: 18px;
    width: 100%;
    padding: 12px;
    color: var(--grey-dark);
    border: 1px solid var(--grey);
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
  }
  :global(select.form-field) {
    padding-right: 30px;
  }
  :global(.form-field:focus) {
    border-color: var(--primary);
    box-shadow: 0 0 0 5px var(--primary);
    outline: none;
  }
  :global(.form-field:disabled) {
    background-color: var(--grey);
    color: var(--grey-dark);
  }
  :global(.form-group) {
    display: flex;
    align-items: flex-start;
    flex-flow: column nowrap;
    width: 100%;
  }
  :global(.form-label) {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    color: var(--grey-dark);
    cursor: pointer;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 4px;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1.9px;
    line-height: 2;
  }
  :global(.form-group--inline) {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
  }
  :global(input[type="radio"]),
  :global(input[type="checkbox"]) {
    opacity: 1;
    color: transparent;
    visibility: hidden;
    width: 0;
    height: 0;
    overflow: hidden;
    appearance: none;
    outline: 0 none;
    border: 0 none;
    position: absolute;
    top: -9999px;
    left: 0;
  }
  :global(.form-field:focus) {
    border-color: var(--primary);
    box-shadow: 0 0 0 5px var(--primary-light);
    outline: none;
  }
  :global(.form-field:disabled) {
    background-color: var(--grey);
    color: var(--grey-dark);
  }
  :global(.form-error) {
    display: block;
    margin-top: 10px;
    font-size: 12px;
    color: var(--red);
  }
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 1em;
    text-align: center;
  }
  .container {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  img {
    display: inline-block;
    height: 8rem;
    width: 8rem;
    margin-top: 20px;
  }
  @media (min-width: 580px) {
    img {
      height: 6rem;
      width: 6rem;
    }
  }
  @media (min-width: 800px) {
    .container {
      max-width: 400px;
    }
    img {
      height: 5rem;
      width: 5rem;
    }
  }
</style>
