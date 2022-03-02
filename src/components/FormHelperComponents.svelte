<script>
  // @ts-nocheck

  /**
   * see: https://svelte-forms-lib-sapper-docs.vercel.app/helpers
   */
  import { onMount, onDestroy } from "svelte";
  import Store from "../store.js";
  import { Form, Field, ErrorMessage } from "svelte-forms-lib";
  import * as yup from "yup";

  $: payload = [];
  let unsubscribe;
  let formProps;

  const validationSchema = yup.object().shape({
    "name-helper": yup.string().required(),
    "email-helper": yup.string().email().required(),
    "gender-helper": yup.string().required(),
  });

  const onSubmit = (value) => {
    Store.update(() => {
      // console.log("UPDATE   value: ", value);

      let newPayload = [value, ...payload];
      //newPayload.concat(oldPayload);
      //newPayload.push(value);
      //payload = newPayload;
      return value;
    });
  };

  onMount(() => {
    unsubscribe = Store.subscribe((updatedPayload) => {
      // console.log("SUBSCRIBE   payload: ", payload);
      // console.log("SUBSCRIBE   oldPayload: ", updatedPayload);

      payload = updatedPayload;

      formProps = {
        initialValues: {
          "name-helper": "",
          "email-helper": "",
          "gender-helper": "",
        },
        validationSchema,
        onSubmit,
      };
    });
  });

  onDestroy(unsubscribe);
</script>

<h1>helper components</h1>

{#if formProps}
  <Form {...formProps}>
    <div class="form-group">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="form-label " for="nameHelper">Name</label>
      <Field class="form-field" name="name-helper" id="nameHelper" />
      <ErrorMessage class="form-error" name="name-helper" />

      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="form-label" for="emailHelper">E-Mail</label>
      <Field class="form-field" name="email-helper" id="emailHelper" />
      <ErrorMessage class="form-error" name="email-helper" />
    </div>

    <div class="form-group--inline">
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
    <Field name="text" type="text" />
    <label>input[type=text]</label>

    <Field name="password" type="password" />
    <label>input[type=password]</label>

    <Field name="number" type="number" />
    <label>input[type=number]</label>

    <Field name="date" type="date" />
    <label>input[type=date]</label>
    -->

    <button type="submit">Submit</button>
  </Form>
{/if}

<h4>Payload:</h4>
<code>{JSON.stringify(payload)}</code>

<style>
  input[type="checkbox"]:checked + .form-label .form-label__circle:before,
  input[type="radio"]:checked + .form-label .form-label__circle:before {
    background: var(--primary);
  }
  .form-label__circle:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  .form-label__circle {
    content: "";
    display: inline-block;
    background-color: --white;
    border-radius: 50%;
    border: 4px solid var(--primary);
    height: 18px;
    width: 18px;
    transition: border-color 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  }
  .form-label__circle:before {
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
  .form-label__text {
    font-size: 22px;
    font-weight: bold;
    padding-left: 10px;
  }
  code {
    text-align: left;
    display: block;
  }
</style>
