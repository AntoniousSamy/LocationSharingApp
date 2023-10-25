import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import SignUpStyle from "../styles/AuthStyle";
import color from "../constants/colors";
import FlatButton from "../components/FlatButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import routes from "../constants/routes";
import { FIREBASE_AUTH } from "../firebaseConfig";
import {createUserWithEmailAndPassword,updateProfile,} from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
const SignUp = (props) => {
  const { navigation } = props;
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const emailIsValid = email.includes("@");
  const passwordIsValid = password.length > 6;
  const auth = FIREBASE_AUTH;
  const [image, setImage] = useState(null);
  const updateUser = async () => {
    await updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: image,
    })
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        //console.log("First", response);
        //const user = response.user;
        updateUser();
        navigation.navigate(routes.LOGIN);
        // will use this data for alert message that the user reg done
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert show error message
      });
  };

  const isValid = () => {
    if (!email || !password || !displayName) {
      Alert.alert("Invalid input", "Please check your entered credentials.", [
        { text: "Okay", style: "cancel" },
      ]);
    } else if (!emailIsValid) {
      Alert.alert("Invalid input", "Invalid Email", [
        { text: "Okay", style: "cancel" },
      ]);
    } else if (!passwordIsValid) {
      Alert.alert("Invalid input", "Min Password Length 6", [
        { text: "Okay", style: "cancel" },
      ]);
    } else if (!isChecked) {
      Alert.alert("Invalid input", "Please Agree Terms And Conditions", [
        { text: "Okay", style: "cancel" },
      ]);
    } else {
      signUp(email, password);
    }
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) { 
      setImage(result.assets[0].uri);
    }
  };
  
  return (
    <SafeAreaView style={SignUpStyle.container}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={SignUpStyle.firstText}>Create Account</Text>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={SignUpStyle.textHeader}>Email address</Text>
          <View style={SignUpStyle.borderStyle}>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={color.black}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
              onChangeText={(e) => {
                setEmail(e);
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={SignUpStyle.textHeader}>UserName</Text>
          <View style={SignUpStyle.borderStyle}>
            <TextInput
              placeholder="UserName"
              placeholderTextColor={color.black}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
              onChangeText={(e) => {
                setDisplayName(e);
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={SignUpStyle.textHeader}>Password</Text>

          <View style={SignUpStyle.borderStyle}>
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
        <View style={{ marginBottom: 12 }}>
          <Text style={SignUpStyle.textHeader}>Profile Image</Text>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          )}
          <Pressable
            style={{
              backgroundColor: color.selectiveYellow,
              width: 100,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginTop: 5,
            }}
            onPress={pickImage}
          >
            <Text style={{ color: color.white }}>Pick Image</Text>
          </Pressable>
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
          <Text>I aggree to the terms and conditions</Text>
        </View>
        <View
          style={{
            marginVertical: "8%",
          }}
        >
          <FlatButton
            text="Sign Up"
            color={color.white}
            backgroundColor={color.selectiveYellow}
            onPress={() => isValid()}
          />
        </View>
        <View style={SignUpStyle.orSignUpBorder}>
          <View style={SignUpStyle.line} />
          <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
          <View style={SignUpStyle.line} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={SignUpStyle.accountBtn}>
            <Image
              source={require("../assets/facebook.png")}
              style={SignUpStyle.image}
              resizeMode="contain"
            />

            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={SignUpStyle.accountBtn}
          >
            <Image
              source={require("../assets/google.png")}
              style={SignUpStyle.image}
              resizeMode="contain"
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={SignUpStyle.lastBorder}>
          <Text style={{ fontSize: 16, color: color.black }}>
            Already have an account
          </Text>
          <Pressable onPress={() => navigation.navigate(routes.LOGIN)}>
            <Text style={SignUpStyle.lastText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

// const signUpWithGoogle = () => {
//   signInWithPopup(FIREBASE_AUTH, FIREBASE_GOOGLE_AUTH)
//     .then((result) => {
//       // Successful sign-in
//       const user = result.user;
//       // You can access the user's information here
//     })
//     .catch((error) => {
//       // Handle errors
//       console.error('Error signing in with Google:', error);
//     });
// };
