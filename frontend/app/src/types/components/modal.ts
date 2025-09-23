import { TimelineItem } from "../common";

export interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (item: Omit<TimelineItem, "id">) => void;
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
