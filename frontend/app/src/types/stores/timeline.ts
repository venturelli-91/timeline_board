// Timeline store interfaces
import { TimelineItem } from "../common";

export interface TimelineStore {
	items: TimelineItem[];
	addItem: (item: Omit<TimelineItem, "id">) => void;
	editItem: (id: number, name: string) => void;
	updateItem: (id: number, updates: Partial<Omit<TimelineItem, "id">>) => void;
	removeItem: (id: number) => void;
}
