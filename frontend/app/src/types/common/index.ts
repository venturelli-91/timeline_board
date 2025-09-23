export interface TimelineItem {
	id: number;
	start: string;
	end: string;
	name: string;
}

export interface ToastState {
	type: "success" | "danger" | "warning";
	message: string;
}

export interface PositionedItem extends TimelineItem {
	left: number;
	width: number;
	lane: number;
	startDays: number;
	endDays: number;
}
