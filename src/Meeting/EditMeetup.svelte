<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";

  let titleTxt = "",
    subtitleTxt = "",
    descriptionTxt = "",
    addressTxt = "",
    emailTxt = "";

  const dispatch = createEventDispatcher();

  function submitForm() {
    dispatch("save", {
      titleTxt,
      subtitleTxt,
      descriptionTxt,
      addressTxt,
      emailTxt,
    });
  }
</script>

<form on:submit|preventDefault={submitForm}>
  <!-- on:input={(event) => (<HTMLInputElement>titleTxt = event.target.value)} -->
  <TextInput
    controlType=""
    rows=""
    id="title"
    label="Title"
    value={titleTxt}
    on:input={(e) => (titleTxt = e.target.value)}
  />
  <TextInput
    controlType=""
    rows=""
    id="subtitle"
    label="subtitle"
    value={subtitleTxt}
    on:input={(e) => (subtitleTxt = e.target.value)}
  />
  <TextInput
    controlType=""
    rows=""
    id="description"
    label="description"
    value={descriptionTxt}
    on:input={(e) => (descriptionTxt = e.target.value)}
  />
  <TextInput
    controlType=""
    rows=""
    id="address"
    label="address"
    value={addressTxt}
    on:input={(e) => (addressTxt = e.target.value)}
  />
  <TextInput
    controlType=""
    rows=""
    id="email"
    label="email"
    value={emailTxt}
    on:input={(e) => (emailTxt = e.target.value)}
  />
  <Button type="submit" caption="Save" />
</form>

<style>
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
