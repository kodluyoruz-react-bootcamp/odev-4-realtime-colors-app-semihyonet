import logo from "./logo.svg";
import "./App.css";
import MainScreen from "./screens/MainScreen";
import { LightProvider } from "./context/LightContext";

function App() {
	return (
		<LightProvider>
			<MainScreen />
		</LightProvider>
	);
}

export default App;
