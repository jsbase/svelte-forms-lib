<script>
  // @ts-nocheck
  /**
   * see: https://svelte-forms-lib-sapper-docs.vercel.app/array
   */
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  $: payload = {};

  const { form, errors, state, handleChange, handleSubmit, handleReset } =
    createForm({
      initialValues: {
        users: [
          {
            name: "",
            email: "",
          },
        ],
      },
      validationSchema: yup.object().shape({
        users: yup.array().of(
          yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
          }),
        ),
      }),
      onSubmit: (values) => {
        payload = JSON.stringify(values);
      },
    });

  const add = () => {
    $form.users = $form.users.concat({ name: "", email: "" });
    $errors.users = $errors.users.concat({ name: "", email: "" });
  };

  const remove = (i) => () => {
    $form.users = $form.users.filter((u, j) => j !== i);
    $errors.users = $errors.users.filter((u, j) => j !== i);
  };
</script>

<form>
  <h1>add form data</h1>

  {#each $form.users as user, j}
    <div class="form-group">
      <div>
        <input
          name={`users[${j}].name`}
          placeholder="name"
          class="form-field"
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.users[j].name}
        />
        {#if $errors.users[j].name}
          <small class="error">{$errors.users[j].name}</small>
        {/if}
      </div>

      <div>
        <input
          name={`users[${j}].email`}
          placeholder="email"
          class="form-field"
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.users[j].email}
        />
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

{#if Object.entries(payload).length}
  <pre>{payload}</pre>
{/if}

<style>
  .error {
    display: block;
    color: red;
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
    width: 100%;
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

  :global(.form-field) {
    font-family: monospace;
    padding: 18px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    color: var(--grey-dark);
    border: 1px solid var(--grey);
    border-radius: 4px;
    transition: all 150ms ease;
  }

  :global(.form-field:focus) {
    border-color: var(--primary);
    box-shadow: 0 0 0 5px var(--primary);
    outline: none;
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

  :global(.form-error) {
    display: block;
    margin-top: 10px;
    font-family: monospace;
    font-size: 12px;
    color: var(--red);
  }
</style>
