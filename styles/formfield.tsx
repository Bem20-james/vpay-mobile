import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputField: {
    borderWidth: 0.78,
    borderRadius: 15,
    width: "100%",
    paddingHorizontal: 12,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    fontFamily: "Inter-Regular",
    flex: 1,
    height: "100%",
    paddingVertical: 8
  },
  multilineInput: {
    textAlignVertical: "top"
  },
  phoneInput: {
    flex: 1,
    marginLeft: 5
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#9B9B9B",
    paddingRight: 8,
    height: "60%"
  },
  countrySelector: {
    padding: 4
  },
  countryCode: {
    fontSize: 14
  },
  errorText: {
    marginTop: 0,
    fontFamily: "Questrial",
    fontWeight: 500,
    fontSize: 11,
    lineHeight: 11,
    marginLeft: 4,
    letterSpacing: 0
  }
});
