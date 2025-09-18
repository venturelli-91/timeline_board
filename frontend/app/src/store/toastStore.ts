import { create } from "zustand";
import { ToastStore } from "../types";

export const useToastStore = create<ToastStore>((set) => ({
	toast: null,

	showToast: (type: "success" | "danger" | "warning", message: string) => {
		set({ toast: { type, message } });
		setTimeout(() => set({ toast: null }), 2500);
	},

	hideToast: () => set({ toast: null }),
}));
