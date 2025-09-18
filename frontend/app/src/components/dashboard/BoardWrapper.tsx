import React from "react";
import { BoardWrapperProps } from "../../types/index";

const BoardWrapper = ({ children }: BoardWrapperProps) => {
	return (
		<div className="max-w-5xl mx-auto my-8 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200 font-sans">
			{children}
		</div>
	);
};

export default BoardWrapper;
