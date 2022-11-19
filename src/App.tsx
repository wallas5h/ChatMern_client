import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { Navigation } from "./components";
import { persistor, store } from "./features/store";
import { Routing } from "./Routing";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <Routing />
      </PersistGate>
    </Provider>
  );
};

export default App;
