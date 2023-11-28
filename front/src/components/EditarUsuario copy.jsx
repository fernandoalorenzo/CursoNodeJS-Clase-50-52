/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { updateUser } from "./ApiMethods";
import { useParams } from "react-router-dom";

function EditarUsuario({ fetchUsers }) {
	// function EditarUsuario({ id_user }) {
	const [editarUsuario, setEditarUsuario] = useState({
	// 	name: "",
	// 	age: 0
	});
	const { id_user } = useParams();
	// console.log(editarUsuario);
	console.log(id_user);

	const handleEditarUsuarioChange = (event) => {
		setEditarUsuario({
			...editarUsuario,
			[event.target.name]: event.target.value,
		});
	};

	// useEffect(() => {
	// 	getUserId();
	// }, []);

	// const getUserId = async () => {
	// 	const res = await fetch(`http://localhost:5000/users/${id_user}`);
	// }

	async function handleSubmitEditarUsuario(event) {
		event.preventDefault();
		await updateUser(id_user, editarUsuario);
		fetchUsers();
		// setEditarUsuario({
		// 	name: "",
		// 	age: 0,
		// });
	}

	return (
		<>
			<div id="editarusuario">
				<h1>Editar usuario</h1>
				<form onSubmit={handleSubmitEditarUsuario}>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">
							Nombre
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={editarUsuario.name}
							onChange={handleEditarUsuarioChange}
						/>
						<label htmlFor="age" className="form-label">
							Edad
						</label>
						<input
							type="number"
							className="form-control"
							id="age"
							name="age"
							value={editarUsuario.age}
							onChange={handleEditarUsuarioChange}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Guardar
					</button>
				</form>
			</div>
		</>
	);
}

export default EditarUsuario;
