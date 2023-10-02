const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			progressPercentage: 0,
			message: null,
			error: null,
			isLoginSuccess: false,
			isSignup: false,
			isChangePassword: false,
			isForgotPassword: false,
			isPasswordReset: false,
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
				// try {
				// 	// fetching data from the backend
				// 	const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
				// 	const data = await resp.json()
				// 	setStore({ message: data.message })
				// 	// don't forget to return something, that is how the async resolves
				// 	return data;
				// } catch (error) {
				// 	console.log("Error loading message from backend", error)
				// }
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
						setStore({ isChangePassword: true })
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
<<<<<<< HEAD

			fetchAllDonation: () => {

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
			fetchEachDonation: (user_id) => {
				fetch(`http://127.0.0.1:3001/api/user/${user_id}/payments`)
					.then((response) => {
						if (!response.ok) {
							throw new Error("Network response was not ok");
						}
						return response.json();
					})
					.then((data) => {
						// Set the user's donation history data in the state
						setStore({ userDonationHistory: data });
					})
					.catch((error) => {
						console.error("Error fetching donation history:", error);
					});
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();
=======
			requestForgotPassword: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/request_reset_password", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.msg) {
						setStore({ message: data.msg })
						setStore({ isForgotPassword: true })
						setTimeout(() => {
							setStore({ message: null })
						}, 20000)
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 20000)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			resetPassword: async (obj) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/reset_password", {
						method: 'POST',
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await resp.json()
					if (data.msg) {
						setStore({ message: data.msg })
						setStore({ isPasswordReset: true })
						setTimeout(() => {
							setStore({ message: null })
						}, 5000)
					}
					setStore({ error: data?.error })
					setTimeout(() => {
						setStore({ error: null })
					}, 20000)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
>>>>>>> main

		}
	};
};

export default getState;
