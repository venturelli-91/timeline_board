// Toast store interfaces
import { ToastState } from "../common";

export interface ToastStore {
	toast: ToastState | null;
	showToast: (type: "success" | "danger" | "warning", message: string) => void;
	hideToast: () => void;
}
