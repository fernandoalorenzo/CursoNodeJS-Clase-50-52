/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { deleteUser } from "./ApiMethods";
import { useNavigate, Link } from "react-router-dom";

function UserTable() {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();

	const fetchUsers = async () => {
		try {
			const response = await fetch("http://localhost:5000/users", {
				method: "GET",
			});
			if (!response.ok) {
				throw new Error("Users not found");
			}
			const data = await response.json();
			console.log(data);
			setUsers(data);
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	const handleAgregar = () => {
		navigate("/CrearUsuario");
	};

	const handleEditar = (id_user) => {
		navigate(`/EditarUsuario/${id_user}`);
	};

	async function handleEliminarUsuario(id_user) {
		await deleteUser(id_user);
		fetchUsers();
	}

	// FUNCION QUE SE EJECUTA SOLO CUANDO SE MONTA EL COMPONENTE, PORQUE EL ARRAY ESTA VACIO (LOS CORCHETES DESPUES DE LA COMA)
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<>
			<div className="container-fluid w-75">
				<div className="row">
					<h1 className="text-center">CRUD de Usuarios</h1>
				</div>
				<div className="d-flex justify-content-end mb-3">
					<button
						type="button"
						className="btn btn-primary align-self-end"
						id="abrirModalAgregar"
						onClick={() => handleAgregar()}>
						<i className="fa-regular fa-square-plus"></i> Agregar
					</button>
				</div>
				<div className="row">
					<table className="table table-hover table-sm table-borderless align-middle text-center">
						<thead className="table-dark">
							<tr>
								<th scope="col">Nombre</th>
								<th scope="col">Edad</th>
								<th scope="col">Email</th>
								<th scope="col">Premium</th>
								<th scope="col">Fecha Nacimiento</th>
								<th scope="col">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => (
								// <tr key={index+1}>
								<tr key={user.id_user}>
									<td className="text-start">{user.name}</td>
									<td>{user.age}</td>
									<td className="text-start">{user.email}</td>
									<td>
										<input
											type="checkbox"
											checked={
												user.is_premium ? true : false
											}
											readOnly
										/>
									</td>
									<td>
										{user.birthdate
											? new Date(
												user.birthdate).toLocaleDateString("en-GB")
											: ""}
									</td>
									<td className="table-secondary">
										<button
											className="btn btn-warning mx-2"
											data-bs-id="{user.id_user}"
											onClick={() =>
												handleEditar(user.id_user)
											}>
											<i className="fa-regular fa-pen-to-square"></i>{" "}
											Editar
										</button>
										<button
											className="btn btn-danger mx-2"
											data-bs-id="{user.id_user}"
											onClick={() =>
												handleEliminarUsuario(
													user.id_user
												)
											}>
											<i className="fa-regular fa-trash-can"></i>{" "}
											Eliminar
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
export default UserTable;
