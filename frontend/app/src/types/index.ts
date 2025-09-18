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
