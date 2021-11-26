<script lang="ts">
  import meetupStore from "./Meeting/meetup-store";
  import { onMount } from "svelte";
  import Header from "./UI/Header.svelte";
  import * as AppData from "./data.json";

  import EditMeetup from "./Meeting/EditMeetup.svelte";
  import MeetupGrid from "./Meeting/MeetupGrid.svelte";

  import { getRandImage } from "./services/fetch";
  import { populateStartupDataWithImages } from "./services/init";
  import Button from "./UI/Button.svelte";

  onMount(async () => {
    meetupStore.init(await populateStartupDataWithImages(AppData.meetups));
  });

  let editMode = null;

  async function addNewMeetup(event) {
    const { titleTxt, subtitleTxt, descriptionTxt, addressTxt, emailTxt } =
      event.detail;

    meetupStore.addNewMeetup({
      id: Math.random().toString(),
      title: titleTxt,
      subtitle: subtitleTxt,
      description: descriptionTxt,
      imageUrl: await getRandImage(),
      address: addressTxt,
      email: emailTxt,
    });
    editMode = null;
  }

  $: console.log($meetupStore, "store");

  function toggleFavorite(event) {
    meetupStore.toggleFavorite(event.detail);
  }

  function cancelEdit() {
    editMode = null;
  }
</script>

<Header />
<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = "add")}>NEW MEETUP</Button>
  </div>
  {#if editMode === "add"}
    <EditMeetup on:save={addNewMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid meetups={$meetupStore} on:togglefavorite={toggleFavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>
