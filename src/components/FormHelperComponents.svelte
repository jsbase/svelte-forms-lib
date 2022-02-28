<script>
  /**
   * see: https://svelte-forms-lib-sapper-docs.vercel.app/helpers
   */
  import { Form, Field, ErrorMessage } from "svelte-forms-lib";
  import * as yup from "yup";

  $: payload = [];

  const formProps = {
    initialValues: {
      "name-helper": "",
      "email-helper": "",
    },
    validationSchema: yup.object().shape({
      "name-helper": yup.string().required(),
      "email-helper": yup.string().email().required(),
    }),
    onSubmit: (values) => {
      payload.push(values);
    },
  };
</script>

<h1>helper components</h1>

<Form {...formProps}>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="form-label" for="nameHelper">Name</label>
  <Field class="form-field" name="name-helper" id="nameHelper" />
  <ErrorMessage class="form-error" name="name-helper" />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="form-label" for="emailHelper">E-Mail</label>
  <Field class="form-field" name="email-helper" id="emailHelper" />
  <ErrorMessage class="form-error" name="email-helper" />

  <!-- more input field types -->
  <!--
  <label>input[type=text]</label>
  <Field name="text" type="text" />

  <label>input[type=password]</label>
  <Field name="password" type="password" />


  <label>input[type=email]</label>
  <Field name="email" type="email" />

  <label>input[type=number]</label>
  <Field name="number" type="number" />

  <label>input[type=date]</label>
  <Field name="date" type="date" />
  -->

  <button type="submit">Submit</button>
</Form>

{#if Object.entries(payload).length}
  <pre>{JSON.stringify(payload)}</pre>
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
