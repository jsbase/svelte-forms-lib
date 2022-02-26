
<script>
  import { Form, Field, ErrorMessage } from "svelte-forms-lib";
  import * as yup from "yup";

  const formProps = {
    initialValues: { name: "", email: "" },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required()
    }),
    onSubmit: values => {
      alert(JSON.stringify(values));
    }
  };
</script>

<Form { ...formProps }>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>Name</label>
  <Field class="form-field" name="name" />
  <ErrorMessage class="form-error" name="name" />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>E-Mail</label>
  <Field class="form-field" name="email" />
  <ErrorMessage class="form-error" name="email" />

  <button type="submit">Submit</button>
</Form>

<style>
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