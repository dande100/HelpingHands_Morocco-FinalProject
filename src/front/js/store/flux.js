const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			error: null,
			isLoginSuccess: false,
			isSignup: false,
			isPasswordRecovery: false,
			user: [],
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
					const resp = await fetch(process.env.BACKEND_URL + "/api/token/", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.access_token) {
						localStorage.setItem('access_token', data.access_token)
						localStorage.setItem('user_id', data.user_id)
						setStore({ isLoginSuccess: true })
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 2000)
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
					if (data.msg) {
						setStore({ message: data.msg })
						setStore({ isSignup: true })
						setTimeout(() => {
							setStore({ message: null })
						}, 2000)
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 2000)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changePassword: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/updatePassword", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.msg) {
						setStore({ message: data.msg })
						setStore({ isPasswordRecovery: true })
						setTimeout(() => {
							setStore({ message: null })
						}, 2000)
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 2000)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getUser: () => {
				const user_id = localStorage.getItem("user_id")
				fetch(`https://organic-telegram-vxj55v44q67cwjw5-3001.app.github.dev/api/user/${user_id}`)
					.then(response => response.json())
					.then(data => {
						console.log(data)
						setStore({ user: data })
					})
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
