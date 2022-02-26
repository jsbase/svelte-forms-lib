<script>
// @ts-nocheck

import { createForm } from "svelte-forms-lib";
import * as yup from "yup";

$: payload = {};

const emptyData = {
    'nameyup': "",
    'emailyup': ""
};

const formProps = {
    initialValues: {
        users: [
            {
                'nameyup': "",
                'emailyup': ""
            }
        ]
    },
    validationSchema: yup.object().shape({
        users: yup.array().of(
            yup.object().shape({
                'nameyup': yup.string().required(),
                'emailyup': yup.string().email().required()
            })
        )
    }),
    onSubmit: values => {
        payload = JSON.stringify(values);
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
    $form.users = $form.users.concat(emptyData);
    $errors.users = $errors.users.concat(emptyData);
};

const remove = i => () => {
    $form.users = $form.users.filter((u, j) => j !== i);
    $errors.users = $errors.users.filter((u, j) => j !== i);
};
</script>

<h1>yup validation</h1>

<form>
    {#each $form.users as user, j}
        <div class="form-group">
            <div>
                <input placeholder="name" name={`$form.users[${j}].nameyup`}
                    on:change={handleChange} on:blur={handleChange} bind:value={$form.users.nameyup}/>
                {#if $errors.users[j].nameyup}
                    <small class="form-error">{$errors.users[j].nameyup}</small>
                {/if}
            </div>

            <div>
                <input placeholder="email" name={`$form.users[${j}].emailyup`}
                    on:change={handleChange} on:blur={handleChange} bind:value={$form.users.emailyup} />
                {#if $errors.users[j].emailyup}
                    <small class="form-error">{$errors.users[j].emailyup}</small>
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

{#if Object.entries(payload).length}
    <pre>{payload}</pre>
{/if}

<style>
input {
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid var(--grey);
  border-radius: 4px;
  transition: all 150ms ease;
  background: var(--white);
  margin-right: 10px;
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
  margin-top: 12px;
  margin-left: 12px;
  line-height: 1.8;
  font-size: 12px;
  padding: 10px 18px;
  min-width: 47px;
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

:global(.form-field) {
    font-family: monospace;
    padding: 18px;
    border: none;
    border-radius: 0;
    color: var(--white);
}

:global(.form-field:focus) {
    border-color: var(--primary);
    box-shadow: 0 0 0 5px var(--primary);
}

:global(.form-error) {
    display: block;
    margin-top: 10px;
    font-family: monospace;
    font-size: 12px;
    color: var(--red);
}

.form-group {
    display: flex;
    align-items: baseline;
}

.button-group {
    display: flex;
}

button {
    margin-left: 15px;
}

button:first-of-type {
    margin-left: 0;
}
</style>