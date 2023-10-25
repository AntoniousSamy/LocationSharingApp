import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./navigations/AuthNavigation";
import {Provider} from 'react-redux';
import { Store } from "./redux/store";
export default function App({}) {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
    </Provider>
  );
}
