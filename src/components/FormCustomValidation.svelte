<script>
  import { createForm } from "svelte-forms-lib";

  $: payload = {};

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: "",
      email: "",
    },
    validate: (values) => {
      let errs = {};

      if (values.name === "") {
        errs["name"] = "custom validation: name is required";
      }

      if (values.email === "") {
        errs["email"] = "custom validation: email is required";
      }

      return errs;
    },
    onSubmit: (values) => {
      payload = JSON.stringify(values);
    },
  });
</script>

<h1>custom validation</h1>

<form on:submit={handleSubmit}>
  <div class="form-group">
    <label class="form-label" for="name">name</label>
    <input
      id="name"
      name="name"
      class="form-field"
      on:change={handleChange}
      bind:value={$form.name}
    />
    {#if $errors.name}<small class="form-error">{$errors.name}</small>{/if}

    <label class="form-label" for="email">email</label>
    <input
      id="email"
      name="email"
      class="form-field"
      on:change={handleChange}
      bind:value={$form.email}
    />
    {#if $errors.email}<small class="form-error">{$errors.email}</small>{/if}
  </div>
  <button type="submit">submit</button>
</form>

{#if Object.entries(payload).length}
  <pre>{payload}</pre>
{/if}

<style></style>
