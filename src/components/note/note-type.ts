export type priority = "high" | "medium" | "low";

export type noteProps = {
  id: string;
  text: string;
  priority?: priority;
  created_at: Date;
  updated_at: Date;
};

export type noteType = {
  id: string;
  text: string;
  priority: priority;
  created_at: Date;
  updated_at: Date;
};

export enum Color {
  high = "#ef6464",
  medium = "#ffff7c",
  low = "#52e6a3",
}
