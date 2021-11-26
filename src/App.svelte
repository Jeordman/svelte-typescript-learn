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
  let editedId = null;
  let pageData = {
    id: null,
  };

  $: console.log($meetupStore, "store");

  function endEditMode() {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showdetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = { id: null };
  }
  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }
</script>

<Header />
<main>
  {#if page === "overview"}
    {#if editMode === "edit"}
      <EditMeetup id={editedId} on:save={endEditMode} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid
      meetups={$meetupStore}
      on:showdetails={showdetails}
      on:edit={startEdit}
      on:add={() => (editMode = "add")}
    />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
