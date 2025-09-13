"use client";

import React, { useState } from "react";

import CustomCard from "./src/components/ui/CustomCard";
import timelineItems from "./src/data/timelineItems";

const Home = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold">Timeline Board</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
				{timelineItems.map((item) => (
					<CustomCard
						key={item.id}
						item={item}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
