import { writable } from "svelte/store";

const meetups = writable([]);

const meetupStore = {
  subscribe: meetups.subscribe,
  init: (initState) => {
    meetups.set(
      initState
    );
  },
  addNewMeetup: (newMeetup) => {
    meetups.update((meetup) => {
      return [...meetup, newMeetup];
    });
  },
  toggleFavorite: (id) => {
    meetups.update((meetup) => {
      return meetup.map((meetup) => {
        if (meetup.id === id) {
          meetup.isFavorite = !meetup.isFavorite;
        }
        return meetup;
      });
    });
  }
};

export default meetupStore;
