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

		const handleCheckboxChange = (e) => {
			setNuevoUsuario({
				...nuevoUsuario,
				is_premium: e.target.checked,
			});
		};

	return (
		<>
			<div className="container w-50" id="usuarionuevo">
				<div className="row">
					<h1 className="text-center">Crear Nuevo Usuario</h1>
				</div>
				<div className="row g-2 my-3">
					{/* <form onSubmit={handleSubmitNuevoUsuario}> */}
					<div className="col-6">
						<label htmlFor="name" className="form-label">
							Nombre
						</label>
						<input
							type="text"
							className="form-control"
							name="name"
							value={nuevoUsuario.name}
							onChange={handleNuevoUsuarioChange}
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="text"
							className="form-control"
							name="email"
							value={nuevoUsuario.email}
							onChange={handleNuevoUsuarioChange}
						/>
					</div>
				</div>
				<div className="row g-3 my-3">
					<div className="col-4 text-center">
						<label htmlFor="age" className="form-label">
							Edad
						</label>
						<input
							type="number"
							className="form-control text-center"
							name="age"
							value={nuevoUsuario.age}
							onChange={handleNuevoUsuarioChange}
						/>
					</div>
					<div className="col-4 text-center">
						<label
							htmlFor="ispremium"
							className="form-check-label">
							Premium
						</label>
						<br />
						<input
							type="checkbox"
							className="form-check-input"
							name="ispremium"
							checked={nuevoUsuario.is_premium}
							onChange={handleCheckboxChange}
						/>
					</div>
					<div className="col-4 text-center">
						<label htmlFor="birthdate"
							className="form-label">
							Nacimiento
						</label>
						<input
							type="date"
							className="form-control text-center"
							name="birthdate"
							value={nuevoUsuario.birthdate || ""}
							onChange={handleNuevoUsuarioChange}
						/>
					</div>
				</div>
				<div className="d-grid gap-2 d-md-flex justify-content-md-end">
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleSubmitNuevoUsuario}>
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
				{/* </form> */}
			</div>
		</>
	);
}

export default CrearUsuario;