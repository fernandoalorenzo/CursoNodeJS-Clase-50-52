/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "./ApiMethods";
import { useNavigate } from "react-router-dom";

const EditarUsuario = () => {
	const { userId } = useParams();
	const [userData, setUserData] = useState({
		name: "",
		age: 0,
		email: "",
		is_premium: false,
		birthdate: "",
	});
	const navigate = useNavigate();

	const fetchUserData = useCallback(async () => {
		try {
			const data = await getUser(userId)
			if (data.birthdate) {
				data.birthdate = data.birthdate.substring(0, 10);
			} else {
				data.birthdate = "";
			}
			setUserData(data);
		} catch (error) {
			console.error(error);
			setUserData(null);
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

	const handleCheckboxChange = (e) => {
		setUserData({
			...userData,
			is_premium: e.target.checked,
		});
	};

	return (
		<div className="container w-50">
			<div className="row">
				<h1 className="text-center">Editar Usuario</h1>
			</div>
			<div className="row g-2 my-3">
				<div className="col-6">
					<label htmlFor="name" className="form-label">
						Nombre
					</label>
					<input
						className="form-control"
						name="name"
						type="text"
						value={userData.name || ""}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						className="form-control"
						name="email"
						type="text"
						value={userData.email || ""}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className="row g-3 my-3">
				<div className="col-4 text-center">
					<label htmlFor="age" className="form-label">
						Edad
					</label>
					<input
						className="form-control text-center"
						name="age"
						type="number"
						value={userData.age || ""}
						onChange={handleInputChange}
					/>
				</div>
				<div className="col-4 text-center">
					<label
						className="form-check-label"
						htmlFor="ispremium">
						Premium
					</label>
					<br />
					<input
						className="form-check-input"
						name="ispremium"
						type="checkbox"
						checked={userData.is_premium}
						onChange={handleCheckboxChange}
					/>
				</div>
				<div className="col-4 text-center">
					<label htmlFor="birthdate"
						className="form-label">
						Nacimiento
					</label>
					<input
						className="form-control text-center"
						name="birthdate"
						type="date"
						value={userData.birthdate || ""}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				<button
					type="button"
					className="btn btn-primary"
					onClick={handleUpdate}>
					<i className="fa-regular fa-floppy-disk px-2"></i>
					Guardar
				</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => navigate("/")}>
					<i className="fa-solid fa-ban px-2"></i>
					Cancelar
				</button>
			</div>
		</div>
	);
};

export default EditarUsuario;
