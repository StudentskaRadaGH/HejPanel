import useClientState from "./util/getClientState";

function App() {
	const data = useClientState();

	return (
		<>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</>
	);
}

export default App;
