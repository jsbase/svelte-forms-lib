<script>
  // @ts-nocheck
  /**
   * see: https://svelte-forms-lib-sapper-docs.vercel.app/yup
   */
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  $: payload = {};

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().oneOf(["Mr.", "Mrs.", "Mx."]).required(),
      name: yup.string().required(),
      email: yup.string().email().required(),
    }),
    onSubmit: (values) => {
      payload = JSON.stringify(values);
    },
  });
</script>

<h1>yup validation</h1>

<form on:submit={handleSubmit}>
  <label for="title" class="form-label">title</label>
  <select
    id="title"
    name="title"
    class="form-field"
    on:change={handleChange}
    bind:value={$form.title}
  >
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

{#if Object.entries(payload).length}
  <pre>{payload}</pre>
{/if}

<style type="text/css"></style>
