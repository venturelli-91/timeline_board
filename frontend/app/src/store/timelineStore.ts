import { create } from "zustand";
import { TimelineItem, TimelineStore } from "../types";
import timelineItemsData from "../data/timelineItems";

export const useTimelineStore = create<TimelineStore>((set, get) => ({
	items: timelineItemsData,

	addItem: (item: Omit<TimelineItem, "id">) => {
		const { items } = get();
		const newItem: TimelineItem = {
			...item,
			id: Math.max(0, ...items.map((i) => i.id)) + 1,
		};
		set((state) => ({
			items: [...state.items, newItem],
		}));
	},

	editItem: (id: number, name: string) => {
		set((state) => ({
			items: state.items.map((item) =>
				item.id === id ? { ...item, name } : item
			),
		}));
	},

	removeItem: (id: number) => {
		set((state) => ({
			items: state.items.filter((item) => item.id !== id),
		}));
	},
}));
