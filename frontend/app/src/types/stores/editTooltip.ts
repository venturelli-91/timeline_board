// Edit tooltip store interfaces

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
