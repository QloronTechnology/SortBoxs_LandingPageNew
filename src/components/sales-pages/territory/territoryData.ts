export const territoryReps = [
  { name: "Riya Sharma", territory: "West", dot: "bg-violet-500", cell: "bg-violet-500", soft: "bg-violet-100 text-violet-700" },
  { name: "Arjun Mehta", territory: "North", dot: "bg-emerald-500", cell: "bg-emerald-500", soft: "bg-emerald-100 text-emerald-700" },
  { name: "Neha Iyer", territory: "South", dot: "bg-amber-500", cell: "bg-amber-400", soft: "bg-amber-100 text-amber-700" },
  { name: "Karan Shah", territory: "East", dot: "bg-sky-500", cell: "bg-sky-500", soft: "bg-sky-100 text-sky-700" },
];

export const GRID_COLS = 8;
export const GRID_ROWS = 5;
export const GRID_SIZE = GRID_COLS * GRID_ROWS;

/** Clean ownership: four blocks, one per territory. */
export const cleanOwner = (index: number) => {
  const col = index % GRID_COLS;
  const row = Math.floor(index / GRID_COLS);
  return col < GRID_COLS / 2 ? (row < 3 ? 0 : 1) : row < 3 ? 2 : 3;
};

/** The "before" picture: owners scattered, some accounts unowned (-1) and some claimed twice (-2). */
export const messyOwner = (index: number) => {
  const h = (index * 37 + 11) % 10;
  if (h < 2) return -1;
  if (h < 4) return -2;
  return (index * 5 + (index >> 3)) % 4;
};
