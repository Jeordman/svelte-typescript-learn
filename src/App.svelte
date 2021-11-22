<script lang="ts">
  import { onMount } from "svelte";
  import Header from "./UI/Header.svelte";
  import * as AppData from "./data.json";

  import MeetupGrid from "./Meeting/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

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
    emailTxt = "",
    isFavorite = false;

  async function addNewThing() {
    const newMeetup = {
      id: Math.random().toString(),
      title: titleTxt,
      subtitle: subtitleTxt,
      description: descriptionTxt,
      imageUrl: await getRandImage(),
      address: addressTxt,
      email: emailTxt,
    };

    meetups = [...meetups, newMeetup];
  }

  function toggleFavorite(event) {
    const id = event.detail;
    const meetupsCopy = [...meetups]
    meetups = meetupsCopy.map((m) => {
      if (m.id === id) {
        m.isFavorite = !m.isFavorite;
      }
      return m;
    })
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
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
