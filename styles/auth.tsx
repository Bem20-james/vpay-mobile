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
    fontFamily: "Questrial",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 30,
    letterSpacing: 0
  },
  radioLabel: {
    fontFamily: "Questrial",
    fontSize: 14
  },
  radioBox: {
    marginTop: 10,
    borderRadius: 10
  },
  btmContent: {
    marginVertical: 10,
    alignItems: "center"
  },
  btmTxt: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 11,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "center",
    position: "absolute",
    top: 100,
    left: 20,
    right: 20
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
  },
  userField: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 7,
    borderWidth: 0.8,
    borderColor: "#9B9B9B",
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 8,
    marginTop: 60
  },
  avatarBg: {
    backgroundColor: "#BFEFFB",
    padding: 7,
    borderRadius: 58
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    resizeMode: "cover"
  },
  welcomeTxt: {
    fontFamily: "Questrial",
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0
  },
  printBg: {
    backgroundColor: "#EAFAFE",
    borderRadius: 58,
    borderWidth: 0.5,
    borderColor: "#9FE7F9",
    padding: 7
  },
  fingerprint: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  }
});
