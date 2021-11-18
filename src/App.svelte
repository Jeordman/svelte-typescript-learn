<script lang="ts">
  import Header from "./UI/Header.svelte";
  import { onMount } from "svelte";
  import * as AppData from "./data.json";

  import MeetupGrid from "./Meeting/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./Meeting/Button.svelte";

  import { getRandImage } from "./services/fetch";
  import { populateStartupDataWithImages } from "./services/init";

  let meetups = [];
  onMount(async () => {
    meetups = (await populateStartupDataWithImages(AppData.meetups)) as any;
  });

  let titleTxt = "",
    subtitleTxt = "",
    descriptionTxt = "",
    addressTxt = "",
    emailTxt = "";

  async function addNewThing() {
    const imageUrl = await getRandImage();
    const newMeetup = {
      id: Math.random().toString(),
      title: titleTxt,
      subtitle: subtitleTxt,
      description: descriptionTxt,
      imageUrl: imageUrl,
      address: addressTxt,
      email: emailTxt,
    };

    meetups = [...meetups, newMeetup];
  }
</script>

<main>
  <Header />
  <form on:submit|preventDefault={addNewThing}>
    <!-- on:input={(event) => (<HTMLInputElement>titleTxt = event.target.value)} -->
    <TextInput
      controlType=""
      rows=""
      id="title"
      label="Title"
      value={titleTxt}
    />
    <TextInput
      controlType=""
      rows=""
      id="subtitle"
      label="subtitle"
      value={subtitleTxt}
    />
    <TextInput
      controlType=""
      rows=""
      id="description"
      label="description"
      value={descriptionTxt}
    />
    <TextInput
      controlType=""
      rows=""
      id="address"
      label="address"
      value={addressTxt}
    />
    <TextInput
      controlType=""
      rows=""
      id="email"
      label="email"
      value={emailTxt}
    />
    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} />
</main>

<style>
  form {
    margin-top: 100px;
  }
</style>
