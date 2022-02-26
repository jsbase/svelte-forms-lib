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
    {#if $errors.name}<small>{$errors.name}</small>{/if}

    <label for="email">email</label>
    <input id="email" name="email" on:change={handleChange} bind:value={$form.email} />
    {#if $errors.email}<small>{$errors.email}</small>{/if}
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
:global(.form-field) {
  font-family: monospace;
  padding: 18px;
  border: none;
  border-radius: 0;
  background: #1e2145;
  color: #fff;
}
:global(.form-field:focus) {
  border-color: #5be2a9;
  box-shadow: 0 0 0 5px #5be2a9;
}
:global(.form-error) {
  font-family: monospace;
  color: #1e2145;
}
</style>
