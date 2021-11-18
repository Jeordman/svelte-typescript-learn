<script>
  import MeetupItem from "./MeetupItem.svelte";
  export let meetups;
</script>

<section id="meetups">
  {#each meetups as meetup (meetup.id)}
    <MeetupItem
      title={meetup.title}
      subtitle={meetup.subtitle}
      description={meetup.description}
      imageUrl={meetup.imageUrl}
      address={meetup.address}
      email={meetup.email}
    />
  {/each}
</section>

<style>
  #meetups {
    margin-top: 5rem;
  }
</style>
