/* Everything on the desk that opens when clicked. Placeholder copy for the
   prototype: bracketed text is a visible TODO for Trevor to fill in. */

export type DeskObjectId =
  | "books"
  | "soda"
  | "laptop"
  | "posters"
  | "movies"
  | "clock"
  | "notebook"
  | "sticky"
  | "photos";

export type DeskObject = {
  title: string;
  /* Short line shown as the hover/focus label in the scene */
  label: string;
  body: string;
  items?: { name: string; note: string; href?: string }[];
};

export const DESK_OBJECTS: Record<DeskObjectId, DeskObject> = {
  books: {
    label: "Books",
    title: "Books I keep coming back to",
    body: "Click a cover to read why it stuck with me.",
    items: [
      { name: "[Book title one]", note: "[Why it's a favorite, plus a favorite quote]", href: "#" },
      { name: "[Book title two]", note: "[Why it's a favorite, plus a favorite quote]", href: "#" },
      { name: "[Book title three]", note: "[Why it's a favorite, plus a favorite quote]", href: "#" },
    ],
  },
  soda: {
    label: "Soda",
    title: "[Favorite soda]",
    body: "[One line on why this is always on the desk]",
  },
  laptop: {
    label: "Laptop stickers",
    title: "Stickers from things I've made",
    body: "[Logos and illustrations as stickers. Each one links to the story behind it]",
  },
  posters: {
    label: "Illustrations",
    title: "Illustrations on the wall",
    body: "[A few of my illustrations, full size]",
  },
  movies: {
    label: "Movies",
    title: "Favorite movies",
    body: "[Movie posters and bobbleheads, with a line on each]",
  },
  clock: {
    label: "Smithfield time",
    title: "It's this time in Smithfield, Utah",
    body: "The light in this office follows the real sun over Smithfield. Come back after dark and the lights will be off.",
  },
  notebook: {
    label: "Newsletter",
    title: "The Discoverable Designer",
    body: "[Latest newsletter issues, opened like notebook pages]",
  },
  sticky: {
    label: "LinkedIn notes",
    title: "Notes from LinkedIn",
    body: "[A few recent posts, as sticky notes]",
  },
  photos: {
    label: "Photos",
    title: "Off the clock",
    body: "Swipe through a few photos.",
    items: [
      { name: "Colombia", note: "[Photo + caption]" },
      { name: "Switzerland", note: "[Photo + caption]" },
      { name: "Golfing", note: "[Photo + caption]" },
      { name: "Design Week SLC", note: "[Photo + caption]" },
    ],
  },
};
