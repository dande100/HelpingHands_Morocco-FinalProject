const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			products: [
				{ id: "price_1NvRPvEkSwAVwyol4daWiYZ4", name: "60 donation" },
				{ id: "price_1NvROvEkSwAVwyolL8AZYT4V", name: "30 donation" },
				{ id: "price_1NvRNpEkSwAVwyol83js5tiq", name: "20 donation" },
				{ id: "price_1NvRLqEkSwAVwyolh2Jdmnqb", name: "10.00 donation" },
				{ id: "price_1NvRJCEkSwAVwyol9ThQzuHUcd", name: "custom donation" }
			],
		},
		actions: {
			checkout: async (productId) => {
				const product = getStore().products.find(p => p.id === productId);
				if (!product) {
					console.error("Product not found");
					return;
				}

				try {
					const response = await fetch('https://probable-orbit-9pvxvpj4wqw34x9-3001.app.github.dev/payment', {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ items: [{ name: product.name, id: product.id }] })
					});

					const data = await response.json();

					if (data.url) {
						window.location.assign(data.url); // Forwarding user to Stripe
					}
				} catch (error) {
					console.error("Checkout error:", error);
				}
			}
		}
	};
};

export default getState;
