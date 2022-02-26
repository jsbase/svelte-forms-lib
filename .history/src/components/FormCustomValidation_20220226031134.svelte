<script>
import { createForm } from "svelte-forms-lib";
import * as yup from "yup";

$: payload = {};

const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
        name: "",
        email: ""
    },
    validate: values => {
        let errs = {};

        if (values.name === "") {
            errs["name"] = "custom validation: name is required";
        }

        if (values.email === "") {
            errs["email"] = "custom validation: email is required";
        }

        return errs;
    },
    onSubmit: values => {
        payload = JSON.stringify(values);
    }
});
</script>

<form on:submit={handleSubmit}>
    <label for="name">name</label>
    <input id="name" name="name" on:change={handleChange} bind:value={$form.name} />
    {#if $errors.name}<small class="error">{$errors.name}</small>{/if}

    <label for="email">email</label>
    <input id="email" name="email" on:change={handleChange} bind:value={$form.email} />
    {#if $errors.email}<small class="error">{$errors.email}</small>{/if}
    <button type="submit">submit</button>
</form>

{#if Object.entries(payload).length}
    <pre>{payload}</pre>
{/if}

<style>
/*
To avoid css naming collisions, css classes are automatically hashed.
Unfortunately that means if we want to customize the helper component e.g. the <Field/> component;
we will need to use the :global(.class-name) and pass .class-name down as a class prop

See https://github.com/sveltejs/svelte/issues/2870 for about this issue
*/
input {
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

input:focus {
  outline: none;
  box-shadow: 0 0 0 4px var(--grey);
  border-color: var(--grey);
}

input:disabled {
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
  margin: 12px auto;
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

label {
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

:global(.form-field) {
  font-family: monospace;
  padding: 18px;
  border: none;
  border-radius: 0;
}

:global(.form-field:focus) {
  border-color: var(--primary);
  box-shadow: 0 0 0 5px var(--primary);
}

:global(.form-error) {
    font-family: monospace;
    font-size: 12px;
    margin-top: 10px;
    display: block;
    color: var(--red);
}
</style>
