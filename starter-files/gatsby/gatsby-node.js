import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
	// 1. Get a template for this page
	const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
	// 2. Query all pizzas
	const { data } = await graphql(`
		query {
			pizzas: allSanityPizza {
				nodes {
					name
					slug {
						current
					}
				}
			}
		}
	`);
	// 3. Loop over each pizza and create a page for that pizza
	data.pizzas.nodes.forEach((pizza) => {
		actions.createPage({
			// What is the URL for this new page??
			path: `pizza/${pizza.slug.current}`,
			component: pizzaTemplate,
			context: {
				slug: pizza.slug.current,
			},
		});
	});
}

async function turnToppingsIntoPages({ graphql, actions }) {
	// 1. Get the template
	const toppingTemplate = path.resolve('./src/pages/pizzas.js');
	// 2. query all the toppings
	const { data } = await graphql(`
		query {
			toppings: allSanityTopping {
				nodes {
					name
					id
				}
			}
		}
	`);
	// 3. createPage for that topping
	data.toppings.nodes.forEach((topping) => {
		actions.createPage({
			path: `topping/${topping.name}`,
			component: toppingTemplate,
			context: {
				topping: topping.name,
				// TODO Regex for Topping
				toppingRegex: `/${topping.name}/i`,
			},
		});
	});
	// 4. Pass topping data to pizza.js
}

export async function createPages(params) {
	// create pages dynamically
	await Promise.all([
		turnPizzasIntoPages(params),
		turnToppingsIntoPages(params),
	]);
}
