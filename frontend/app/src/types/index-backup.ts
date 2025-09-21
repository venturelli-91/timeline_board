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
}

export interface TimelineCardProps {
	item: TimelineItem;
	isSelected?: boolean;
}

export interface CustomButtonProps {
	name: string;
	onClick: () => void;
	className?: string;
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
	updateItem: (id: number, updates: Partial<Omit<TimelineItem, "id">>) => void;
	removeItem: (id: number) => void;
}

// Timeline View interfaces (from components/dashboard/TimelineView.tsx)
export interface TimelineViewProps {
	items: TimelineItem[];
	onRemove?: (id: number) => void;
	onEdit?: (id: number, name: string) => void;
	onItemUpdate?: (
		id: number,
		updates: Partial<Omit<TimelineItem, "id">>
	) => void;
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
	onItemMove?: (
		itemId: number,
		newStartDate: string,
		newEndDate: string
	) => void;
	timelineStartDate?: Date;
}

// Timeline Card Components interfaces
export interface CompactTimelineCardProps {
	item: TimelineItem;
	onDragStart?: (
		e: React.MouseEvent,
		item: TimelineItem,
		left: number,
		lane: number
	) => void;
	currentLeft?: number;
	currentLane?: number;
}

export interface ExpandedTimelineCardProps {
	item: TimelineItem;
	onRemove?: (id: number) => void;
}

export interface EditableItemNameProps {
	initialName: string;
	onSave: (newName: string) => void;
	showTooltip?: boolean;
}

export interface ItemTooltipProps {
	text: string;
	isVisible: boolean;
}

// ===============================
// STORE INTERFACES
// ===============================

// Tooltip Store interfaces (from store/tooltipStore.ts)
export interface TooltipState {
	isVisible: boolean;
	item: TimelineItem | null;
	position: { x: number; y: number };
}

export interface TooltipStore extends TooltipState {
	showTooltip: (item: TimelineItem, x: number, y: number) => void;
	hideTooltip: () => void;
}

// Drag Store interfaces (from store/dragStore.ts)
export interface DragState {
	isDragging: boolean;
	draggedItem: TimelineItem | null;
	dragOffset: { x: number; y: number };
	originalPosition: { left: number; lane: number };
	previewPosition: { left: number; lane: number } | null;
}

export interface DragStore extends DragState {
	startDrag: (
		item: TimelineItem,
		offset: { x: number; y: number },
		originalPos: { left: number; lane: number }
	) => void;
	updateDragPosition: (position: { left: number; lane: number }) => void;
	endDrag: () => void;
	cancelDrag: () => void;
}

// Task Interaction Store interface (from store/taskInteractionStore.ts)
export interface TaskInteractionStore {
	selectedTaskId: number | null;
	setSelectedTask: (id: number | null) => void;
}

// Edit Tooltip Store interfaces (from store/editTooltipStore.ts)
export interface EditTooltipState {
	isVisible: boolean;
	itemId: number | null;
	itemName: string;
	position: { x: number; y: number };
}

export interface EditTooltipStore extends EditTooltipState {
	showEditTooltip: (
		itemId: number,
		itemName: string,
		x: number,
		y: number
	) => void;
	hideEditTooltip: () => void;
	updateItemName: (newName: string) => void;
}

// Edit Tooltip Component interface
export interface EditTooltipProps {
	onSave: (itemId: number, newName: string) => void;
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
