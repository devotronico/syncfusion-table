import { Provider } from "react-redux";
import { store } from "./lib/store";

import "./styles.css";
import Table from "./Table";

export default function App() {
  return (
    <Provider store={store}>
      <h1>FINCONS</h1>
      <p>Test eseguito da Daniele Manzi</p>
      <Table />
    </Provider>
  );
}
