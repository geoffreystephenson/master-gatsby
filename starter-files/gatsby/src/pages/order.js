import { graphql } from 'gatsby';
import React from 'react';
import SEO from '../components/SEO';
import Img from 'gatsby-image';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function OrderPage({ data }) {
	const { values, updateValue } = useForm({
		name: '',
		email: '',
	});
	const pizzas = data.pizzas.nodes;
	return (
		<>
			<SEO title="Order a Pizza!" />
			<form>
				<fieldset>
					<legend>Your Info</legend>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						value={values.name}
						onChange={updateValue}
					></input>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={values.email}
						onChange={updateValue}
					></input>
				</fieldset>
				<fieldset>
					<legend>Menu</legend>
					{pizzas.map((pizza) => (
						<div key={pizza.id}>
							<Img
								width="50"
								height="50"
								fluid={pizza.image.asset.fluid}
							/>
							<div>
								<h2>{pizza.name}</h2>
							</div>
							<div>
								{['S', 'M', 'L'].map((size) => (
									<button type="button" key={size}>
										{size}{' '}
										{formatMoney(
											calculatePizzaPrice(
												pizza.price,
												size
											)
										)}
									</button>
								))}
							</div>
						</div>
					))}
				</fieldset>
				<fieldset>
					<legend>Order</legend>
				</fieldset>
			</form>
		</>
	);
}

export const query = graphql`
	query {
		pizzas: allSanityPizza {
			nodes {
				name
				id
				slug {
					current
				}
				price
				image {
					asset {
						fixed(width: 600, height: 200) {
							...GatsbySanityImageFixed
						}
						fluid(maxWidth: 400) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`;
