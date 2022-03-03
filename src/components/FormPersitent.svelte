<script>
  // @ts-nocheck

  /**
   * see: https://svelte-forms-lib-sapper-docs.vercel.app/helpers
   */
  import { onMount, onDestroy } from "svelte";
  import { Form, Field, ErrorMessage } from "svelte-forms-lib";
  import { Users } from "../users";
  import * as yup from "yup";

  let payload;
  let unsubscribe;
  let formProps;

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    useremail: yup.string().email().required(),
    usergender: yup.string().required(),
  });

  const onSubmit = (user) => {
    Users.update((data) => {
      const users = typeof data !== "object" ? JSON.parse(data) : data;

      users.unshift(user);

      data = JSON.stringify(users);

      return data;
    });
  };

  onMount(() => {
    unsubscribe = Users.subscribe((data) => {
      const users = typeof data !== "object" ? JSON.parse(data) : data;

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

<h1>persitent data</h1>

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
        value="male"
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
        value="female"
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
        value="diverse"
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

<!-- svelte-ignore missing-declaration -->
{#if payload}
  <ul>
    {#each payload as user}
      <li>
        <dl>
          <dt>Name</dt>
          <dd>{user.username}</dd>

          <dt>E-Mail</dt>
          <dd>
            <a href="mailto:{user.useremail}">{user.useremail}</a>
          </dd>

          <dt>Gender</dt>
          <dd>{user.usergender}</dd>
        </dl>
      </li>
    {/each}
  </ul>
{:else}
  <p>No data.</p>
{/if}

<style type="text/css">
  h1 {
    margin-top: 2rem;
  }
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
    transition: all 0.4s ease-in-out;
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
    transition: all 0.4s ease-in-out;
  }
  .form-label__text {
    font-size: 18px;
    font-weight: 600;
    padding-left: 10px;
    letter-spacing: normal;
  }
  ul {
    display: block;
    list-style-type: none;
    list-style-position: outside;
  }
  li {
    margin-top: 1rem;
  }
  li:first-of-type {
    margin-top: 0;
  }
  dl {
    display: flex;
    flex-flow: row wrap;
    border: solid var(--primary);
    border-radius: 5px;
  }
  dt {
    background: var(--primary);
    color: var(--white);
    flex-basis: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-weight: 700;
    padding-right: 10px;
  }
  dd {
    flex-basis: 70%;
    flex-grow: 1;
    height: 40px;
    display: flex;
    font-weight: 500;
    align-items: center;
    justify-items: flex-start;
    padding-left: 10px;
    border-bottom: var(--border-width) solid var(--primary);
  }
  dt:last-of-type,
  dd:last-of-type {
    border-bottom: 0;
  }
  button {
    font-weight: 700;
  }
</style>
