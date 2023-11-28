/* eslint-disable no-unused-vars */
import UserTable from "./components/UserTable";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrearUsuario from "./components/CrearUsuario";
import EditarUsuario from "./components/EditarUsuario";
// import { userId , userData } from "./components/EditarUsuario";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<UserTable />} />
					<Route path="/CrearUsuario" element={<CrearUsuario />} />
					{/* <Route path="/EditarUsuario" element={<EditarUsuario />} / */}
					<Route path="/EditarUsuario/:userId" element={<EditarUsuario />}
					/>
				</Routes>
			</BrowserRouter>
			{/* <UserTable /> */}
		</>
	);
}

export default App;
