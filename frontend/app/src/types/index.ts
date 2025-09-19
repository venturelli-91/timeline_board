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
