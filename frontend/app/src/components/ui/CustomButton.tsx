import React from "react";

interface CustomButtonProps {
	name: string;
	onClick: () => void;
}

const CustomButton = ({ name, onClick }: CustomButtonProps) => {
	return <button onClick={onClick}>{name}</button>;
};

export default CustomButton;
