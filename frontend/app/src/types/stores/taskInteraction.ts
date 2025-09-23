export interface TaskInteractionStore {
	selectedTaskId: number | null;
	setSelectedTask: (id: number | null) => void;
}
