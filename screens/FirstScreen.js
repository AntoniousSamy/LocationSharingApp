import { View, Text } from "react-native";
import FlatButton from "../components/FlatButton";
import FirstScreenStyle from "../styles/FirstScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import color from "../constants/colors";
import routes from "../constants/routes";
const FirstScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={FirstScreenStyle.container}>
      <View style={FirstScreenStyle.icon}>
        <Ionicons name="location-sharp" size={200} color={color.selectiveYellow} />
        <Text style={FirstScreenStyle.text}>Location Sharing App</Text>
      </View>
      <View style={FirstScreenStyle.buttons}>
        <View style={FirstScreenStyle.button}>
        <FlatButton text="Sign Up" onPress={() => navigation.navigate(routes.SIGNUP)} color={color.white} backgroundColor={color.selectiveYellow} />
        </View>
        <View style={FirstScreenStyle.button}>
        <FlatButton text="LogIn" onPress={() => navigation.navigate(routes.LOGIN)} color={color.selectiveYellow} backgroundColor={color.white} />
        </View>
      </View>
    </View>
  );
};

export default FirstScreen;

