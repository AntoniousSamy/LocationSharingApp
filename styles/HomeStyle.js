import { StyleSheet, Dimensions } from "react-native";
import color from "../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").width;

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  whiteBorder: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: screenHeight * 0.42,
    backgroundColor: color.white,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 1,
    marginRight: 10,
  },
  textStyle: {
    color: color.black,
    fontSize: 18,
    
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  closeBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeStyle;
