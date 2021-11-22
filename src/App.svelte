<script lang="ts">
  import { onMount } from "svelte";
  import Header from "./UI/Header.svelte";
  import * as AppData from "./data.json";

  import EditMeetup from "./Meeting/EditMeetup.svelte";
  import MeetupGrid from "./Meeting/MeetupGrid.svelte";

  import { getRandImage } from "./services/fetch";
  import { populateStartupDataWithImages } from "./services/init";
  import Button from "./UI/Button.svelte";

  let meetups = [];
  onMount(async () => {
    meetups = (await populateStartupDataWithImages(AppData.meetups)) as any;
  });

  let editMode = null;

  async function addNewMeetup(event) {
    console.log('here')
    const { titleTxt, subtitleTxt, descriptionTxt, addressTxt, emailTxt } =
      event.detail;
      console.log( titleTxt, subtitleTxt, descriptionTxt, addressTxt, emailTxt )
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
    editMode = null;
  }

  function toggleFavorite(event) {
    const id = event.detail;
    const meetupsCopy = [...meetups];
    meetups = meetupsCopy.map((m) => {
      if (m.id === id) {
        m.isFavorite = !m.isFavorite;
      }
      return m;
    });
  }
</script>

<Header />
<main>
  <div class="meetup-controls">
    <Button caption="NEW MEETUP" on:click={() => (editMode = "add")} />
  </div>
  {#if editMode === "add"}
    <EditMeetup on:save={addNewMeetup} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>
