
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
  <label>name</label>
  <Field class="form-field" name="name" />
  <ErrorMessage class="form-error" name="name" />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>email</label>
  <Field class="form-field" name="email" />
  <ErrorMessage class="form-error" name="email" />

  <button type="submit">submit</button>
</Form>

<style>
/* To avoid css naming collisions, css classes are automatically hashed.
Unfortunately that means if we want to customize the helper component e.g. the <Field/> component;
we will need to use the :global(.class-name) and pass .class-name down as a class prop

See https://github.com/sveltejs/svelte/issues/2870 for about this issue */

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