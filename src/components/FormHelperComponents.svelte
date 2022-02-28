<script>
  /**
   * see: https://svelte-forms-lib-sapper-docs.vercel.app/helpers
   */
  import { Form, Field, ErrorMessage } from "svelte-forms-lib";
  import * as yup from "yup";

  $: payload = JSON.parse(localStorage.getItem("form-helper"));

  const formProps = {
    initialValues: {
      "name-helper": "",
      "email-helper": "",
      "gender-helper": "",
    },
    validationSchema: yup.object().shape({
      "name-helper": yup.string().required(),
      "email-helper": yup.string().email().required(),
      "gender-helper": yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log("(onSubmit) before: ", payload);
      //console.log("(onSubmit) values: ", values);

      const newData = [];
      newData.concat(Array.isArray(payload) && payload.length ? payload : []);
      newData.push(values);

      //console.log("(onSubmit) newData: ", JSON.stringify(newData));

      localStorage.setItem("form-helper", JSON.stringify(newData));

      payload = JSON.stringify(newData);

      console.log("(onSubmit) after: ", payload);
    },
  };
</script>

<h1>helper components</h1>

<Form {...formProps}>
  <div class="form-group">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="form-label" for="nameHelper">Name</label>
    <Field class="form-field" name="name-helper" id="nameHelper" />
    <ErrorMessage class="form-error" name="name-helper" />

    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="form-label" for="emailHelper">E-Mail</label>
    <Field class="form-field" name="email-helper" id="emailHelper" />
    <ErrorMessage class="form-error" name="email-helper" />
  </div>

  <div class="form-group">
    <Field
      type="radio"
      name="gender-helper"
      value="Mr"
      class="form-checkbox"
      id="gender-helper-mr"
      checked
    />
    <label for="gender-helper-mr" class="form-label">
      <div class="form-label__circle" />
      <span class="form-label__text">Mr</span>
    </label>

    <Field
      type="radio"
      name="gender-helper"
      value="mrs"
      class="form-checkbox"
      id="gender-helper-mrs"
    />
    <label for="gender-helper-mrs" class="form-label">
      <div class="form-label__circle" />
      <span class="form-label__text">Mrs</span>
    </label>

    <Field
      type="radio"
      name="gender-helper"
      value="mx"
      class="form-checkbox"
      id="gender-helper-mx"
    />
    <label for="gender-helper-mx" class="form-label">
      <div class="form-label__circle" />
      <span class="form-label__text">Mx</span>
    </label>
  </div>

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

<h4>Data:</h4>
<pre>{payload}</pre>

<style>
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .form-label {
    display: inline-flex;
    align-items: center;
    color: var(--grey-dark);
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 4px;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1.9px;
    line-height: 2;
    cursor: pointer;
  }
  :global(input[type="radio"]),
  :global(input[type="checkbox"]) {
    opacity: 1;
    color: transparent;
    visibility: hidden;
    width: 0;
    height: 0;
    overflow: hidden;
    appearance: none;
    outline: 0 none;
    border: 0 none;
    position: absolute;
    top: -9999px;
    left: 0;
  }
  :global(input[type="checkbox"]:checked
      + .form-label
      .form-label__circle:before),
  :global(input[type="radio"]:checked
      + .form-label
      .form-label__circle:before) {
    background: var(--primary);
  }
  .form-label:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  .form-label:hover .form-label__circle {
    border-color: var(--primary);
    color: var(--primary);
  }
  :global(.form-label__circle) {
    content: "";
    display: inline-block;
    background-color: --white;
    border-radius: 50%;
    border: 4px solid var(--primary);
    height: 18px;
    width: 18px;
    transition: border-color 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  }
  :global(.form-label__circle:before) {
    content: "";
    background-color: transparent;
    border-radius: 50%;
    display: block;
    height: 14px;
    width: 14px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  }
  :global(.form-label__text) {
    display: inline-block;
    font-size: 22px;
    font-weight: bold;
    padding-left: 10px;
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
    border-color: var(--primary-dark);
    box-shadow: 0 0 0 5px var(--primary-dark);
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
