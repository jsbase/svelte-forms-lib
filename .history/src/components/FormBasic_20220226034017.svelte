<script>
import { createForm } from "svelte-forms-lib";

$: payload = {};

const { form, handleChange, handleSubmit } = createForm({
	initialValues: {
    gender: "",
    name: "",
    email: ""
	},
	onSubmit: values => {
	  payload = JSON.stringify(values);
	}
});
</script>

<form on:submit={handleSubmit}>
	<label for="gender" class="form-label">Gender</label>
	<select id="gender" name="gender" on:change={handleChange} bind:value={$form.gender}>
		<option></option>
		<option value="male">Mr.</option>
		<option value="female">Mrs.</option>
		<option value="diverse">Mx.</option>
	</select>

	<label for="name-basic" class="form-label">Name</label>
	<input id="name-basic" name="name" on:change={handleChange} bind:value={$form.name} />

	<label for="email-basic" class="form-label">E-Mail</label>
	<input id="email-basic" name="email" on:change={handleChange} bind:value={$form.email} />

	<button type="submit">Submit</button>
</form>

{#if Object.entries(payload).length}
    <pre>{payload}</pre>
{/if}

<style>
input,
select {
  font-family: inherit;
  font-size: inherit;
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
select:focus {
  outline: none;
  box-shadow: 0 0 0 4px var(--grey);
  border-color: var(--grey);
}

input:disabled,
select:disabled {
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
  border: none;
  border-radius: 0;
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
</style>
