export function getRandImage(): Promise<string> {
  return new Promise(async (resolve, rej) => {
    try {
      const imageRes = await fetch("https://picsum.photos/1000/1000");
      return resolve(imageRes?.url as string);
    } catch (e) {
      return rej(e);
    }
  });
}
