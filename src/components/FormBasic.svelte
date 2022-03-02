<script>
  /**
   * see: https://svelte-forms-lib-sapper-docs.vercel.app/basic
   */
  import { createForm } from "svelte-forms-lib";

  $: payload = {};

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      gender: "",
      nameBasic: "",
      emailBasic: "",
    },
    onSubmit: (values) => {
      payload = JSON.stringify(values);
    },
  });
</script>

<h1>basic</h1>

<form on:submit={handleSubmit}>
  <label for="gender" class="form-label">Gender</label>
  <select
    class="form-field"
    id="gender"
    name="gender"
    on:change={handleChange}
    bind:value={$form.gender}
  >
    <option />
    <option value="male">Mr.</option>
    <option value="female">Mrs.</option>
    <option value="diverse">Mx.</option>
  </select>

  <label for="name-basic" class="form-label">Name</label>
  <input
    class="form-field"
    id="name-basic"
    name="name-basic"
    on:change={handleChange}
    bind:value={$form.nameBasic}
  />

  <label for="email-basic" class="form-label">E-Mail</label>
  <input
    class="form-field"
    id="email-basic"
    name="email-basic"
    on:change={handleChange}
    bind:value={$form.emailBasic}
  />

  <button type="submit">Submit</button>
</form>

{#if Object.entries(payload).length}
  <pre>{payload}</pre>
{/if}

<style></style>
