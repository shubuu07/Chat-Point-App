import { Provider } from 'react-redux';
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { store } from './src/Redux/store';
import Routes from './src/Routes/Routes';
import AppPushNotification from './src/utils/firebase/AppPushNotification';
let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppPushNotification />
        <Routes />
      </PersistGate>
    </Provider>
  )
}

export default App