<script>
  // @ts-nocheck

  /**
   * see: https://svelte-forms-lib-sapper-docs.vercel.app/helpers
   */
  import { onMount, onDestroy } from "svelte";
  import { Form, Field, ErrorMessage } from "svelte-forms-lib";
  import { Users } from "../users.js";
  import * as yup from "yup";

  $: payload = Users;
  let unsubscribe;
  let formProps;

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    useremail: yup.string().email().required(),
    usergender: yup.string().required(),
  });

  const onSubmit = (user) => {
    Users.update((data) => {
      const users = JSON.parse(data);
      users.unshift(user);

      data = users;

      return data;
    });
  };

  onMount(() => {
    unsubscribe = Users.subscribe((users) => {
      payload = users;

      formProps = {
        initialValues: {
          username: "",
          useremail: "",
          usergender: "",
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
      <label class="form-label " for="username">Name</label>
      <Field class="form-field" name="username" id="username" />
      <ErrorMessage class="form-error" name="username" />

      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="form-label" for="useremail">E-Mail</label>
      <Field class="form-field" name="useremail" id="useremail" />
      <ErrorMessage class="form-error" name="useremail" />
    </div>

    <div class="form-group--inline">
      <Field
        type="radio"
        name="usergender"
        value="Mr"
        class="form-checkbox"
        id="usergender-mr"
        checked
      />
      <label for="usergender-mr" class="form-label">
        <div class="form-label__circle" />
        <span class="form-label__text">Mr</span>
      </label>

      <Field
        type="radio"
        name="usergender"
        value="mrs"
        class="form-checkbox"
        id="usergender-mrs"
      />
      <label for="usergender-mrs" class="form-label">
        <div class="form-label__circle" />
        <span class="form-label__text">Mrs</span>
      </label>

      <Field
        type="radio"
        name="usergender"
        value="mx"
        class="form-checkbox"
        id="usergender-mx"
      />
      <label for="usergender-mx" class="form-label">
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

<code>
  {JSON.stringify(payload)}
</code>

<!--
<ul>
  {#each JSON.parse(payload) as userData}
    <li>
      {JSON.stringify(userData)}
      <dl>
        {#each Array.from(JSON.parse(userData)) as uData, key}
          <dt>{key}</dt>
          <dd>{uData}</dd>
        {/each}
      </dl>
    </li>
  {/each}
</ul>
-->
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
