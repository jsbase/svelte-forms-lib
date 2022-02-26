<script>
// @ts-nocheck
/**
 * see: https://svelte-forms-lib-sapper-docs.vercel.app/yup
 */
import { createForm } from "svelte-forms-lib";
import * as yup from "yup";

const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
    name: "",
    email: ""
    },
    validationSchema: yup.object().shape({
        title: yup.string().oneOf(["Mr.", "Mrs.", "Mx."]).required(),
        name: yup.string().required(),
        email: yup.string().email().required()
    }),
    onSubmit: values => {
        alert(JSON.stringify(values));
    }
});
</script>

<form on:submit={handleSubmit}>
    <label for="title" class="form-label">title</label>
    <select
        id="title"
        name="title"
        class="form-select"
        on:change={handleChange}
        bind:value={$form.title}>
        <option />
        <option>Mr.</option>
        <option>Mrs.</option>
        <option>Mx.</option>
    </select>
    {#if $errors.title}
        <small class="form-error">{$errors.title}</small>
    {/if}

    <label for="name" class="form-label">name</label>
    <input
        id="name"
        name="name"
        class="form-field"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.name}
    />
    {#if $errors.name}
        <small class="form-error">{$errors.name}</small>
    {/if}

    <label for="email" class="form-label">email</label>
    <input
        id="email"
        name="email"
        class="form-field"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.email}
    />
    {#if $errors.email}
        <small class="form-error">{$errors.email}</small>
    {/if}

    <button type="submit">submit</button>
</form>

<style>
:root {
  --primary-light: #a6f9d6;
  --primary: #5be2a9;
  --primary-dark: #53ce9a;
  --secondary: #1e2145;
  --white: #fff;
  --grey: #e6e6ff;
  --grey-dark: #6d7098;
  --red: #ff6b6b;
}

:global(.form-field) {
  font-family: inherit;
  font-size: inherit;
  max-width: 400px;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid var(--grey);
  border-radius: 4px;
  transition: all 150ms ease;
  background: var(--white);
}

select {
  height: 45px;
}

:global(.form-field:focus) {
  outline: none;
  box-shadow: 0 0 0 4px var(--grey);
  border-color: var(--grey);
}

:global(.form-field:disabled) {
  color: var(--grey);
}

button {
  color: var(--white);
  background-color: var(--primary);
  border: none;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  outline: none;
  border-radius: 4px;
  display: block;
  margin-top: 12px;
  line-height: 1.8;
  font-size: 12px;
  padding: 10px 18px;
  min-width: 120px;
  transition: all 150ms ease;
  cursor: pointer;
}

button:disabled {
  background-color: var(--grey);
}

button:focus:not(:disabled) {
  box-shadow: 0 0 0 4px var(--primary-light);
}

button:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

:global(.form-label) {
  display: block;
  color: var(--grey-dark);
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1.9px;
  line-height: 2;
}

:global(.form-error) {
    display: block;
    margin-top: 10px;
    font-family: monospace;
    font-size: 12px;
    color: var(--red);
}
</style>
