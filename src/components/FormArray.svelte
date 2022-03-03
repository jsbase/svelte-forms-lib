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
  <h1>editable data</h1>

  {#each $form.users as user, j}
    <div>
      <div class="form-group">
        <input
          name={`users[${j}].name`}
          placeholder="name"
          class="form-field"
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.users[j].name}
        />
        {#if $errors.users[j].name}
          <small class="form-error">{$errors.users[j].name}</small>
        {/if}

        <input
          name={`users[${j}].email`}
          placeholder="email"
          class="form-field"
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.users[j].email}
        />
        {#if $errors.users[j].email}
          <small class="form-error">{$errors.users[j].email}</small>
        {/if}
      </div>

      <div class="button-group">
        {#if j === $form.users.length - 1}
          <button type="button" on:click={add}>+</button>
        {/if}

        {#if $form.users.length !== 1}
          <button type="button" on:click={remove(j)}>-</button>
        {/if}
      </div>
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

<style type="text/css">
  h1 {
    margin-top: 5rem;
  }
  .form-group input {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .button-group {
    display: flex;
  }
  button ~ button {
    margin-left: 15px;
  }
</style>
