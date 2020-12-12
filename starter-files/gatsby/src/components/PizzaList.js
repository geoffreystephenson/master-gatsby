import { Link } from 'gatsby';
import React from 'react';

function SinglePizza({ pizza }) {
	return <div></div>;
}

export default function PizzaList({ pizzas }) {
	return (
		<>
			<div>
				{pizzas.map((pizza) => (
					<SinglePizza key={pizza.id} pizza={pizza} />
				))}
			</div>
		</>
	);
}
