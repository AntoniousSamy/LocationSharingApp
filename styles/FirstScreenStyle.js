import { StyleSheet, Dimensions, Platform } from "react-native";
import color from "../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FirstScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgColor,
  },
  icon: {
    alignItems: "center",
    marginTop: screenHeight * 0.25,
  },
  text: {
    color: color.white,
    fontSize: 25,
    fontWeight: "600", 
    ...Platform.select({
      android: {
        fontFamily: "serif",
      },
    }),
  },
  buttons: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.25,
  },
  button: {
    width: "50%",
    paddingBottom: "6%",
  },
});

export default FirstScreenStyle;
