import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputField: {
    borderWidth: 0.87,
    borderRadius: 100,
    width: "100%",
    color: "#9B9B9B",
    paddingHorizontal: 12,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    color: "#000000",
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
    borderRightColor: "#E7E7E7",
    paddingRight: 8,
    height: "60%"
  },
  countrySelector: {
    padding: 4
  },
  countryCode: {
    fontSize: 14
  },
  bottomSheetHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7"
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  bottomSheetContent: {
    paddingBottom: 24
  },
  bottomSheetItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,

    borderBottomWidth: 0.5,
    borderBottomColor: "#E7E7E7"
  },
  bottomSheetItemText: {
    fontSize: 16
  }
});
