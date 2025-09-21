import React, { useEffect } from "react";
import { useTooltipStore } from "../../../store/tooltipStore";

const TimelineTooltip: React.FC = () => {
	const { isVisible, item, position, hideTooltip } = useTooltipStore();

	// Close tooltip when pressing ESC
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				hideTooltip();
			}
		};

		if (isVisible) {
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}
	}, [isVisible, hideTooltip]);

	if (!isVisible || !item) {
		return null;
	}

	return (
		<div
			className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs"
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				transform: "translate(-50%, -100%)", // Center horizontally and position above cursor
			}}>
			<div className="mb-2">
				<h3 className="font-semibold text-lg text-gray-800 mb-1">
					{item.name}
				</h3>
			</div>

			<div className="space-y-1 text-sm text-gray-600">
				<div>
					<span className="font-medium">Start:</span> {item.start}
				</div>
				<div>
					<span className="font-medium">End:</span> {item.end}
				</div>
				<div>
					<span className="font-medium">Duration:</span>{" "}
					{(() => {
						const startDate = new Date(item.start);
						const endDate = new Date(item.end);
						const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
						const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
						return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
					})()}
				</div>
			</div>

			{/* Small arrow pointing down */}
			<div
				className="absolute top-full left-1/2 transform -translate-x-1/2"
				style={{
					width: 0,
					height: 0,
					borderLeft: "6px solid transparent",
					borderRight: "6px solid transparent",
					borderTop: "6px solid white",
				}}
			/>
		</div>
	);
};

export default TimelineTooltip;
