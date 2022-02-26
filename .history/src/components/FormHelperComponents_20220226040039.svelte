
<script>
  import { Form, Field, ErrorMessage } from "svelte-forms-lib";
  import * as yup from "yup";

  $: payload = {};

  const formProps = {
    initialValues: {
      "name-helper": "",
      "email-helper": ""
    },
    validationSchema: yup.object().shape({
      'name-helper': yup.string().required(),
      'email-helper': yup
        .string()
        .email()
        .required()
    }),
    onSubmit: values => {
        payload = JSON.stringify(values);
    }
  };
</script>

<Form { ...formProps }>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="form-label" for="nameHelper">Name</label>
  <Field class="form-field" name="name-helper" id="nameHelper" />
  <ErrorMessage class="form-error" name="name-helper" />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="form-label" for="emailHelper">E-Mail</label>
  <Field class="form-field" name="email-helper" id="emailHelper" /> />
  <ErrorMessage class="form-error" name="email-helper" /> />

  <button type="submit">Submit</button>
</Form>

{#if Object.entries(payload).length}
    <pre>{payload}</pre>
{/if}

<style>
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

:global(.form-field:focus) {
  outline: none;
  box-shadow: 0 0 0 4px var(--grey);
  border-color: var(--grey);
}

:global(.form-field:disabled) {
  color: var(--grey);
}

:global(.form-error) {
    display: block;
    margin-top: 10px;
    font-family: monospace;
    font-size: 12px;
    color: var(--red);
}
</style>