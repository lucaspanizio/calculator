// const keys = [
//   ["CE", "C", "<", "%"],
//   ["7", "8", "9", "/"],
//   ["4", "5", "6", "x"],
//   ["1", "2", "3", "-"],
//   ["0", ",", "=", "+"],
// ];

export type TKey = "primaries" | "specials" | "equal";

export const keys = [
  [
    { label: "CE", type: "specials" },
    { label: "C", type: "specials" },
    { label: "<", type: "specials", icon: "backspace" },
    { label: "%", type: "specials" },
  ],
  [
    { label: "7", type: "primaries" },
    { label: "8", type: "primaries" },
    { label: "9", type: "primaries" },
    { label: "/", type: "specials" },
  ],
  [
    { label: "4", type: "primaries" },
    { label: "5", type: "primaries" },
    { label: "6", type: "primaries" },
    { label: "*", type: "specials" },
  ],
  [
    { label: "1", type: "primaries" },
    { label: "2", type: "primaries" },
    { label: "3", type: "primaries" },
    { label: "-", type: "specials" },
  ],
  [
    { label: "0", type: "primaries" },
    { label: ".", type: "primaries" },
    { label: "=", type: "equal" },
    { label: "+", type: "specials" },
  ],
] as { label: string; type: TKey, icon?: string }[][];