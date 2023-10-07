const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		
			products:[
				{id:"price_1NvRPvEkSwAVwyol4daWiYZ4",name: "60 donation"},
				{id:"price_1NvROvEkSwAVwyolL8AZYT4V", name: "30 donation"},
				{id: "price_1NvRNpEkSwAVwyol83js5tiq",name: "20 donation"},
				{id: "price_1NvRLqEkSwAVwyolh2Jdmnqb", name: "10 donation"},
				{id: "price_1NvRJCEkSwAVwyol9ThQzuHUcd",name: "custom donation"}
				 ],
		},
		actions: {
			
		
			checkout: async () => {
				await fetch('https://super-waffle-6j6p6j47xxrh4jq6-4000.app.github.dev/checkout', {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({items: [ {name: "10 donation", id: "price_1NvRLqEkSwAVwyolh2Jdmnqb"}]})
				}).then((response) => {
					return response.json();
				}).then((response) => {
					if(response.url) {
						window.location.assign(response.url); // Forwarding user to Stripe
					}
				});
			}

		 
			
		}
	};
};

export default getState;
