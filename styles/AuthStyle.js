import { StyleSheet, Dimensions } from "react-native";
import color from "../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const AuthStyle = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
  },
  firstText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: color.black,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 8,
  },
  borderStyle: {
    width: "100%",
    height: 48,
    borderColor: color.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
  orSignUpBorder: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: color.grey,
    marginHorizontal: 10,
  },
  accountBtn:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 52,
    borderWidth: 1,
    borderColor: color.grey,
    marginRight: 4,
    borderRadius: 10,
  },
  image:{
    height: 36,
    width: 36,
    marginRight: 8,
  },
  lastBorder:{
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22,
  },
  lastText:{
    fontSize: 16,
    color: color.bgColor,
    fontWeight: "bold",
    marginLeft: 6,
  }
});
export default AuthStyle;
