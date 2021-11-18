import { getRandImage } from "./fetch";

export async function populateStartupDataWithImages(meetups: any) {
  const meetupsCopy = meetups.map(async (element) => {
    return new Promise(async (res) => {
      element.imageUrl = await getRandImage();
      return res(element);
    });
  });
  return await Promise.all(meetupsCopy);
}
