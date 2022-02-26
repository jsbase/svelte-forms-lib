<script>
// @ts-nocheck

import { createForm } from "svelte-forms-lib";
import * as yup from "yup";

const formProps = {
    initialValues: {
        users: [
            {
                name: "",
                email: ""
            }
        ]
    },
    validationSchema: yup.object().shape({
        users: yup.array().of(
            yup.object().shape({
            name: yup.string().required(),
            email: yup
                .string()
                .email()
                .required()
            })
        )
    }),
    onSubmit: values => {
        alert(JSON.stringify(values));
    }
};

const {
    form,
    errors,
    state,
    handleChange,
    handleSubmit,
    handleReset
} = createForm(formProps);

const add = () => {
    $form.users = $form.users.concat({ name: "", email: "" });
    $errors.users = $errors.users.concat({ name: "", email: "" });
};

const remove = i => () => {
    $form.users = $form.users.filter((u, j) => j !== i);
    $errors.users = $errors.users.filter((u, j) => j !== i);
};
</script>

<form>
    <h1>Add users</h1>

    {#each $form.users as user, j}
        <div class="form-group">
            <div>
                <input name={`users[${j}].name`} placeholder="name" on:change={handleChange} on:blur={handleChange} bind:value={$form.users[j].name} />
                {#if $errors.users[j].name}
                    <small class="error">{$errors.users[j].name}</small>
                {/if}
            </div>

            <div>
                <input placeholder="email" name={`users[${j}].email`} on:change={handleChange} on:blur={handleChange} bind:value={$form.users[j].email} />
                {#if $errors.users[j].email}
                    <small class="error">{$errors.users[j].email}</small>
                {/if}
            </div>

            {#if j === $form.users.length - 1}
                <button type="button" on:click={add}>+</button>
            {/if}

            {#if $form.users.length !== 1}
                <button type="button" on:click={remove(j)}>-</button>
            {/if}
        </div>
    {/each}

    <div class="button-group">
        <button type="button" on:click={handleSubmit}>submit</button>
        <button type="button" on:click={handleReset}>reset</button>
    </div>
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

select {
  height: 45px;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 4px var(--grey);
  border-color: var(--grey);
}

input:disabled,
select:disabled,
textarea:disabled {
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
  margin-left: 12px;
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

/* used for errors */
small {
  display: block;
  font-size: 12px;
  color: var(--red);
  margin-top: 10px;
  color: red;
  display: block;
}

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

.error {
    display: block;
    color: var(--red);
}

.form-group {
    display: flex;
    align-items: baseline;
}

.button-group {
    display: flex;
}

button ~ button {
    margin-left: 15px;
}
</style>