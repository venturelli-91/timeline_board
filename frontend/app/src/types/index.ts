// TaskModalProps interface (from components/taskModal/TaskModal.tsx)
export interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (item: Omit<TimelineItem, "id">) => void;
}
// TimelineBoardProps interface (from components/dashboard/TimelineBoard.tsx)
export interface TimelineBoardProps {
	items: TimelineItem[];
}
// TaskModalUIProps interface (from components/ui/TaskModalUI.tsx)
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
// TimelineItem interface (from data/timelineItems.ts)
export interface TimelineItem {
	id: number;
	start: string;
	end: string;
	name: string;
}

// CustomCardProps interface (from components/ui/CustomCard.tsx)
export interface CustomCardProps {
	item: TimelineItem;
}

// BoardWrapperProps interface (from components/ui/BoardWrapper.tsx)
export interface BoardWrapperProps {
	children: React.ReactNode;
}

// Toast interfaces (from store/toastStore.ts)
export interface ToastState {
	type: "success" | "danger" | "warning";
	message: string;
}

export interface ToastStore {
	toast: ToastState | null;
	showToast: (type: "success" | "danger" | "warning", message: string) => void;
	hideToast: () => void;
}

// Timeline Store interface (from store/timelineStore.ts)
export interface TimelineStore {
	items: TimelineItem[];
	addItem: (item: Omit<TimelineItem, "id">) => void;
	editItem: (id: number, name: string) => void;
	removeItem: (id: number) => void;
}
