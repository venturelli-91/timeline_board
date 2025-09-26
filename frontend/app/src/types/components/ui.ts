export interface CustomButtonProps {
	name: string;
	onClick: () => void;
	className?: string;
}

export interface BoardWrapperProps {
	children: React.ReactNode;
}

export interface BoardHeaderProps {
	title: string;
	onAddTask?: () => void;
	viewMode?: "timeline" | "grid";
	onChangeViewMode?: (mode: "timeline" | "grid") => void;
}

export interface EditableItemNameProps {
	initialName: string;
	onSave: (newName: string) => void;
	showTooltip?: boolean;
}

export interface EditableItemNameWithTooltipProps {
	initialName: string;
	showTooltip?: boolean;
	itemId: number;
}

export interface ItemTooltipProps {
	text: string;
	isVisible: boolean;
}

export interface EditTooltipProps {
	onSave: (itemId: number, newName: string) => void;
}
