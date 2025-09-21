export interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (item: Omit<TimelineItem, "id">) => void;
}

export interface TimelineBoardProps {
	items: TimelineItem[];
}
export interface TaskModalUIProps {
	name: string;
	start: string;
	end: string;
	onNameChange: (v: string) => void;
	onStartChange: (v: string) => void;
	onEndChange: (v: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	onClose: () => void;
}
export interface TimelineItem {
	id: number;
	start: string;
	end: string;
	name: string;
}

export interface CustomCardProps {
	item: TimelineItem;
	isSelected?: boolean;
}

export interface BoardWrapperProps {
	children: React.ReactNode;
}

export interface ToastState {
	type: "success" | "danger" | "warning";
	message: string;
}

export interface ToastStore {
	toast: ToastState | null;
	showToast: (type: "success" | "danger" | "warning", message: string) => void;
	hideToast: () => void;
}

export interface TimelineStore {
	items: TimelineItem[];
	addItem: (item: Omit<TimelineItem, "id">) => void;
	editItem: (id: number, name: string) => void;
	removeItem: (id: number) => void;
}

// Timeline View interfaces (from components/dashboard/TimelineView.tsx)
export interface TimelineViewProps {
	items: TimelineItem[];
	onRemove?: (id: number) => void;
	onEdit?: (id: number, name: string) => void;
}

// Time Axis interfaces (from components/ui/TimeAxis.tsx)
export interface TimeAxisProps {
	startDate: Date;
	endDate: Date;
	width: number;
}

// Timeline component interfaces
export interface TimelineHeaderProps {
	title?: string;
}

export interface TimelineControlsProps {
	itemCount: number;
	totalDays: number;
}

export interface TimelineGridProps {
	totalDays: number;
	dayWidth: number;
}

export interface PositionedItem extends TimelineItem {
	left: number;
	width: number;
	lane: number;
	startDays: number;
	endDays: number;
}

export interface TimelineTasksContainerProps {
	positionedItems: PositionedItem[];
	totalDays: number;
	dayWidth: number;
	onRemove?: (id: number) => void;
	onEdit?: (id: number, name: string) => void;
}

// Timeline View Store interface (from store/timelineViewStore.ts)
export interface TimelineViewStore {
	timelineWidth: number;
	getTimelineBounds: (items: TimelineItem[]) => {
		startDate: Date;
		endDate: Date;
	};
	getTotalDays: (startDate: Date, endDate: Date) => number;
	getDayWidth: (timelineWidth: number, totalDays: number) => number;
	getPositionedItems: (
		items: TimelineItem[],
		startDate: Date,
		dayWidth: number
	) => PositionedItem[];
	setTimelineWidth: (width: number) => void;
}
