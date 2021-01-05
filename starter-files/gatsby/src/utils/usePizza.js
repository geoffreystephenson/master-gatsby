import { useState } from 'react';

export default function usePizza({ pizzas, values }) {
	// 1. Create some state to hold our order
	// We got rid of this line because we moved useState up to the provider
	// const [order, setOrder] = useState([]);
	// Now we access both our state and our updater function (setOrder) via context
	const [order, setOrder] = useState([]);
	// 2. Make a function add things to order
	function addToOrder(orderedPizza) {
		setOrder([...order, orderedPizza]);
	}
	// 3. Make a function remove things from order
	function removeFromOrder(index) {
		setOrder([
			// everything before the item we want to remove
			...order.slice(0, index),
			// everything after the item we want to remove
			...order.slice(index + 1),
		]);
	}

	return {
		order,
		addToOrder,
		removeFromOrder,
	};
}
