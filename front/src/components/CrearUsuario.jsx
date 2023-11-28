/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createUser } from "./ApiMethods";
import { useNavigate } from "react-router-dom";
	
function CrearUsuario() {
	const navigate = useNavigate();

	const [nuevoUsuario, setNuevoUsuario] = useState({
		name: "",
		age: 0,
	});

	const handleNuevoUsuarioChange = (event) => {
		setNuevoUsuario({
			... nuevoUsuario,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
	}, [nuevoUsuario]);

	async function handleSubmitNuevoUsuario(event) {
		event.preventDefault();
		// console.log(nuevoUsuario);
		await createUser(nuevoUsuario);
		// fetchUsers();
		setNuevoUsuario({
			name: "",
			age: 0,
		});
		navigate("/");
	}

	return (
		<>
			<div id="usuarionuevo">
				<h1>Crear nuevo usuario</h1>
				<form onSubmit={handleSubmitNuevoUsuario}>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">
							Nombre
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={nuevoUsuario.name}
							onChange={handleNuevoUsuarioChange}
						/>
						<label htmlFor="age" className="form-label">
							Edad
						</label>
						<input
							type="number"
							className="form-control"
							id="age"
							name="age"
							value={nuevoUsuario.age}
							onChange={handleNuevoUsuarioChange}
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

export default CrearUsuario;