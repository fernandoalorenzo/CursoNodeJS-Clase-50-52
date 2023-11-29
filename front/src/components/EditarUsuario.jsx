/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "./ApiMethods";
import { useNavigate } from "react-router-dom";

const EditarUsuario = () => {
	const { userId } = useParams();
	const [userData, setUserData] = useState({ name: "", age: 0, email: "", is_premium: false, birthdate: "" });
	const navigate = useNavigate();

	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/users/${userId}`,
				{
					method: "GET",
				}
			);
			if (!response.ok) {
				throw new Error("User not found");
			}
			const data = await response.json();
			setUserData(data);
			console.log(data);
		} catch (error) {
			console.error(error);
			return [];
		}
	}, [userId]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	const handleUpdate = async () => {
		await updateUser(userId, userData).then(() => {
			navigate("/");
		});
	};

	const handleInputChange = (e) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
		
	};

	return (
		<div>
			<h1>Editar Usuario</h1>
			<form>
				<label htmlFor="name" className="form-label">
					Usuario
				</label>
				<input
					className="form-control"
					name="name"
					type="text"
					value={userData.name || ""}
					onChange={handleInputChange}
				/>
				<br />
				<label htmlFor="age" className="form-label">
					Edad
				</label>
				<input
					className="form-control"
					name="age"
					type="text"
					value={userData.age || ""}
					onChange={handleInputChange}
				/>
				<br />
				<label>Email:</label>
				<input
					className="form-control"
					name="email"
					type="text"
					value={userData.email || ""}
					onChange={handleInputChange}
				/>
				<br />
				<label className="form-check-label" htmlFor="ispremium">
					Premium:
				</label>
				<br />
				<input
					className="form-check-input"
					name="ispremium"
					type="checkbox"
					value={userData.is_premium ? true : false || ""}
					onChange={handleInputChange}
					
				/>
				<br />
				<br />
				<label>Nacimiento:</label>
				<input
					className="form-control"
					name="birthdate"
					type="date"
					value={
						userData.birthdate || ""
					}
					onChange={handleInputChange}
				/>
				<br />
				<button
					type="button"
					className="btn btn-primary"
					onClick={handleUpdate}>
					Guardar
				</button>
			</form>
		</div>
	);
};

export default EditarUsuario;
