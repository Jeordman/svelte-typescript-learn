<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation";

  let titleTxt = "",
    subtitleTxt = "",
    descriptionTxt = "",
    addressTxt = "",
    emailTxt = "";

  const dispatch = createEventDispatcher();

  // validity watchers
  $: titleValid = !isEmpty(titleTxt);
  $: subtitleValid = !isEmpty(subtitleTxt);
  $: descriptionValid = !isEmpty(descriptionTxt);
  $: addressValid = !isEmpty(addressTxt);
  $: emailValid = isValidEmail(emailTxt);
  $: formValid =
    titleValid &&
    subtitleValid &&
    descriptionValid &&
    addressValid &&
    emailValid;

  function submitForm() {
    dispatch("save", {
      titleTxt,
      subtitleTxt,
      descriptionTxt,
      addressTxt,
      emailTxt,
    });
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <!-- on:input={(event) => (<HTMLInputElement>titleTxt = event.target.value)} -->
    <TextInput
      controlType=""
      rows=""
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter valid title"
      bind:value={titleTxt}
    />
    <TextInput
      controlType=""
      rows=""
      id="subtitle"
      label="subtitle"
      valid={subtitleValid}
      validityMessage="Please enter valid subtitle"
      bind:value={subtitleTxt}
    />
    <TextInput
      controlType=""
      rows=""
      id="description"
      label="description"
      valid={descriptionValid}
      validityMessage="Please enter valid description"
      bind:value={descriptionTxt}
    />
    <TextInput
      controlType=""
      rows=""
      id="address"
      label="address"
      valid={addressValid}
      validityMessage="Please enter valid address"
      bind:value={addressTxt}
    />
    <TextInput
      controlType=""
      rows=""
      id="email"
      label="email"
      valid={emailValid}
      validityMessage="Please enter valid email"
      bind:value={emailTxt}
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formValid}
      >Save</Button
    >
  </div>
</Modal>

<style>
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
