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
