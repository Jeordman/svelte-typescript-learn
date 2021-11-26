<script>
  import meetupStore from "./meetup-store";
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation";
  import { getRandImage } from "../services/fetch";

  export let id = null;

  let titleTxt = "",
    subtitleTxt = "",
    descriptionTxt = "",
    addressTxt = "",
    emailTxt = "";

  if (id) {
    const unsub = meetupStore.subscribe((meetups) => {
      const selectedMeetup = meetups.find((meetup) => meetup.id === id);
      const { title, subtitle, description, address, email } = selectedMeetup;
      titleTxt = title;
      (subtitleTxt = subtitle),
        (descriptionTxt = description),
        (addressTxt = address),
        (emailTxt = email);
    });
    unsub();
  }

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

  async function submitForm() {
    dispatch("save");
    const meetupData = {
      id: Math.random().toString(),
      title: titleTxt,
      subtitle: subtitleTxt,
      description: descriptionTxt,
      imageUrl: await getRandImage(),
      address: addressTxt,
      email: emailTxt,
    };

    if (id) {
      meetupStore.updateMeetup(id, meetupData);
    } else {
      meetupStore.addNewMeetup(meetupData);
    }
  }

  function cancel() {
    dispatch("cancel");
  }

  function deleteMeetup() {
    meetupStore.deleteMeetup(id);
    dispatch("save");
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
      value={titleTxt}
      on:input={(event) => (titleTxt = event.target.value)}
    />
    <TextInput
      controlType=""
      rows=""
      id="subtitle"
      label="subtitle"
      valid={subtitleValid}
      validityMessage="Please enter valid subtitle"
      value={subtitleTxt}
      on:input={(event) => (subtitleTxt = event.target.value)}
    />
    <TextInput
      controlType=""
      rows=""
      id="address"
      label="address"
      valid={addressValid}
      validityMessage="Please enter valid address"
      value={addressTxt}
      on:input={(event) => (addressTxt = event.target.value)}
    />
    <TextInput
      controlType=""
      rows=""
      id="email"
      label="email"
      valid={emailValid}
      validityMessage="Please enter valid email"
      value={emailTxt}
      on:input={(event) => (emailTxt = event.target.value)}
    />
    <TextInput
      controlType="textarea"
      rows=""
      id="description"
      label="description"
      valid={descriptionValid}
      validityMessage="Please enter valid description"
      bind:value={descriptionTxt}
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formValid}
      >Save</Button
    >
    <Button type="button" on:click={deleteMeetup}>Delete</Button>
  </div>
</Modal>

<style>
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
