const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			progressPercentage: 0,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}

			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getToken: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.access_token) {
						localStorage.setItem('access_token', data.access_token)
					}
					setStore({ message: data.message })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			createAccount: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			fetchDonation: () => {

				fetch("http://127.0.0.1:3001/api/progress")
					.then((response) => {
						if (!response.ok) {
							throw new Error("Network response was not ok");
						}
						return response.json();
					})
					.then((data) => {
						const { progress } = data;
						setStore({ progressPercentage: progress });
					})
					.catch((error) => {
						console.error("Error fetching progress data:", error);
					});
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
