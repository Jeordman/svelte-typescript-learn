<script lang="ts">
  import Button from "./Button.svelte";

  export let title;
  export let subtitle;
  export let description;
  export let imageUrl;
  export let address;
  export let email;
</script>

<div>
  <header>
    <section>{title}</section>
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
    <Button type="button" caption="Show details" />
    <Button type="button" caption="Favorite" />
  </footer>
</div>
