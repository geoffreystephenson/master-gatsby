import React from 'react';

export default function Footer() {
	return (
		<footer>
			<p className="center">
				&copy; {new Date().getFullYear()} Slick's Slices
			</p>
		</footer>
	);
}
