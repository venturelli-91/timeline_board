// UI component interfaces

export interface CustomButtonProps {
	name: string;
	onClick: () => void;
	className?: string;
}

export interface BoardWrapperProps {
	children: React.ReactNode;
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

export interface EditTooltipProps {
	onSave: (itemId: number, newName: string) => void;
}
