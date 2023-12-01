/* eslint-disable no-unused-vars */
async function createUser(user) {
	try {
		const response = await fetch("http://localhost:5000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
}

async function updateUser(userId, updatedUserData) {
	try {
		const response = await fetch(`http://localhost:5000/users/${userId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUserData),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
}

async function deleteUser(userId) {
	try {
		const response = await fetch(`http://localhost:5000/users/${userId}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

const getUsers = async () => {
	try {
		const response = await fetch(`http://localhost:5000/users`, {
			method: "GET",
		});
		if (!response.ok) {
			throw new Error("Users not found");
		}
		const data = await response.json();
		// console.log(data);
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getUser = async (userId) => {
	try {
		const response = await fetch(`http://localhost:5000/users/${userId}`, {
			method: "GET",
		});
		if (!response.ok) {
			throw new Error("User not found");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export { createUser, updateUser, deleteUser, getUsers, getUser };
