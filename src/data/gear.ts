export interface GearEntry {
  name: string;
  link: string;
  image: string;
}

export interface GearCategory {
  category: string;
  listUrl: string;
  items: GearEntry[];
}

export const gearCategories: GearCategory[] = [
  {
    category: "Laptop",
    listUrl: "https://www.amazon.com/shop/phillipche/list/2EL6EOCFIKQ6O",
    items: [
      {
        name: "MacBook Air M3 chip",
        link: "https://www.apple.com/macbook-air/",
        image: "https://m.media-amazon.com/images/I/61hw7aZWYSL._AC_SL1500_.jpg",
      },
    ],
  },
];