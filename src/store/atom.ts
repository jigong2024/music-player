import { ChartType } from "@/types/melon.type";
import { atom } from "jotai";

export const chartTypeAtom = atom<ChartType>("day");
