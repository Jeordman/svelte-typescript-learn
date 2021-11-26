import { writable } from "svelte/store";

const meetups = writable([]);

const meetupStore = {
  subscribe: meetups.subscribe,
  init: (initState) => {
    meetups.set(initState);
  },
  addNewMeetup: (newMeetup) => {
    meetups.update((meetup) => {
      return [...meetup, newMeetup];
    });
  },
  updateMeetup: (id, meetupData) => {
    meetups.update((meetups) => {
      const meetupIndex = meetups.findIndex((meetup) => meetup.id === id);
      const updatedMeetup = { ...meetups[meetupIndex], ...meetupData };
      const updatedMeetups = [...meetups];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  deleteMeetup: (id) => {
    meetups.update((meetups) => {
      return meetups.filter((meetup) => meetup.id !== id);
    });
  },
  toggleFavorite: (id) => {
    meetups.update((meetups) => {
      return meetups.map((meetup) => {
        if (meetup.id === id) {
          meetup.isFavorite = !meetup.isFavorite;
        }
        return meetup;
      });
    });
  },
};

export default meetupStore;
