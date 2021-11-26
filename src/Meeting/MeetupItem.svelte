<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import meetupStore from "./meetup-store";
  import Badge from "../UI/Badge.svelte";
  import Button from "../UI/Button.svelte";

  export let id;
  export let title;
  export let subtitle;
  export let description;
  export let imageUrl;
  export let address;
  export let email;
  export let isFav;

  function toggleFavorite(id) {
    meetupStore.toggleFavorite(id);
  }

  const dispatch = createEventDispatcher()
</script>

<article>
  <header>
    <section>
      {title}
      {#if isFav}
        <Badge>FAVORITE</Badge>
      {/if}
    </section>
    <section>{subtitle}</section>
    <p>{address}</p>
    <p>{email}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt={description} />
  </div>
  <div class="content">
    <p />
  </div>
  <footer>
    <Button href="mailto:{email}">Contact</Button>
    <Button
      mode="outline"
      type="button"
      color={isFav ? null : "success"}
      on:click={toggleFavorite}
    >
      {isFav ? "Unfavorite" : "Favorite"}
    </Button>
    <Button mode="outline" type="button" on:click={() => dispatch('showdetails', id)}>Show details</Button>
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>
