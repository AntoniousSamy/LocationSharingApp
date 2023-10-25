import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import FlatButton from "../components/FlatButton";
import Checkbox from "expo-checkbox";
import LogInStyle from "../styles/AuthStyle";
import routes from "../constants/routes";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setName, setId, setImage, setEmail } from "../redux/actions";
const Login = (props) => {
  const { navigation } = props;
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  //const { name } = useSelector((state) => state.userReducer);
  //const { uid } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const auth = FIREBASE_AUTH;

  const isValid = () => {
    if (!userEmail || !password) {
      Alert.alert("Invalid input", "Please check your entered credentials.", [
        { text: "Okay", style: "cancel" },
      ]);
    } else {
      logIn(email, password);
    }
  };
  const logIn = async () => {
    await signInWithEmailAndPassword(auth, userEmail, password)
      .then((response) => {
        const user = response.user;
        //console.log("First", user.displayName);
        //console.log("First", user);
        dispatch(setName(user.displayName));
        dispatch(setId(user.uid));
        dispatch(setImage(user.photoURL));
        dispatch(setEmail(user.email));
        navigation.navigate(routes.HOME);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Invalid input", "Invalid Email Or Password", [
          { text: "Okay", style: "cancel" },
        ]);
      });
  };
  return (
    <SafeAreaView style={LogInStyle.container}>
      <View style={{ flex: 1, marginHorizontal: 22, marginTop: "14%" }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={LogInStyle.firstText}>Hi Welcome Back ! 👋</Text>

          <Text
            style={{
              fontSize: 16,
              color: color.black,
            }}
          >
            Hello again you have been missed!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={LogInStyle.textHeader}>Email address</Text>

          <View style={LogInStyle.borderStyle}>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={color.black}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
              onChangeText={(e) => {
                setUserEmail(e);
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={LogInStyle.textHeader}>Password</Text>

          <View style={LogInStyle.borderStyle}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={color.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: "100%",
              }}
              onChangeText={(e) => {
                setPassword(e);
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={color.black} />
              ) : (
                <Ionicons name="eye" size={24} color={color.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? color.bgColor : undefined}
          />

          <Text>Remenber Me</Text>
        </View>

        <View
          style={{
            marginVertical: "8%",
          }}
        >
          <FlatButton
            text="LogIn"
            color={color.white}
            backgroundColor={color.selectiveYellow}
            onPress={logIn}
          />
        </View>

        <View style={LogInStyle.orSignUpBorder}>
          <View style={LogInStyle.line} />
          <Text style={{ fontSize: 14 }}>Or Login with</Text>
          <View style={LogInStyle.line} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={LogInStyle.accountBtn}>
            <Image
              source={require("../assets/facebook.png")}
              style={LogInStyle.image}
              resizeMode="contain"
            />

            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={LogInStyle.accountBtn}>
            <Image
              source={require("../assets/google.png")}
              style={LogInStyle.image}
              resizeMode="contain"
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={LogInStyle.lastBorder}>
          <Text style={{ fontSize: 16, color: color.black }}>
            Don't have an account ?{" "}
          </Text>
          <Pressable onPress={() => isValid}>
            <Text style={LogInStyle.lastText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
