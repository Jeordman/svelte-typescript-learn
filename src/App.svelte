<script lang="ts">
  import meetupStore from "./Meeting/meetup-store";
  import { onMount } from "svelte";
  import Header from "./UI/Header.svelte";
  import * as AppData from "./data.json";

  import EditMeetup from "./Meeting/EditMeetup.svelte";
  import MeetupGrid from "./Meeting/MeetupGrid.svelte";

  import { populateStartupDataWithImages } from "./services/init";
  import Button from "./UI/Button.svelte";
  import MeetupDetail from "./Meeting/MeetupDetail.svelte";

  onMount(async () => {
    meetupStore.init(await populateStartupDataWithImages(AppData.meetups));
  });

  let editMode = null;
  let page = "overview";
  let pageData = {
    id: null,
  };

  $: console.log($meetupStore, "store");

  function endEditMode() {
    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
  }

  function showdetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = { id: null };
  }
</script>

<Header />
<main>
  {#if page === "overview"}
    <div class="meetup-controls">
      <Button on:click={() => (editMode = "add")}>NEW MEETUP</Button>
    </div>
    {#if editMode === "add"}
      <EditMeetup on:save={endEditMode} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid meetups={$meetupStore} on:showdetails={showdetails} />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>
