import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: 20
  },
  logo: {
    width: 106,
    height: 50,
    resizeMode: "contain",
    marginHorizontal: "auto",
    marginVertical: 10
  },
  heading: {
    fontFamily: "Inter-Bold",
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: "left"
  },
  subtitle: {
    fontFamily: "Inter-Medium",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 30,
    letterSpacing: 0
  },
  btmContent: {
    marginVertical: 10,
    alignItems: "center"
  },
  btmTxt: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 12,
    marginTop: 35,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "center"
  },
  forgotPwd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 4,
    marginVertical: 7,
    gap: 2
  },
  forgotPwdTxt: {
    textDecorationLine: "underline",
    fontFamily: "Inter-Bold",
    fontSize: 13
  }
});
