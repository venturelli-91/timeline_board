"use client";

import React from "react";
import BoardWrapper from "./src/components/ui/BoardWrapper";
import CustomCard from "./src/components/ui/CustomCard";
import timelineItems from "./src/data/timelineItems";

const Home = () => {
	return (
		<>
			<BoardWrapper>
				<div className="font-sans">
					<h1 className="flex text-3xl font-bold justify-center">
						Timeline Board
					</h1>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
						{timelineItems.map((item) => (
							<CustomCard
								key={item.id}
								item={item}
							/>
						))}
					</div>
				</div>
			</BoardWrapper>
		</>
	);
};

export default Home;
