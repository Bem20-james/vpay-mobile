import { StyleSheet } from "react-native";

export const KycStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  container: {
    marginHorizontal: 7,
    marginTop: 10
  },
  btnCon: {
    position: "absolute",
    bottom: -350,
    left: 10,
    right: 10
  },
  heroTxt: {
    fontSize: 13,
    fontFamily: "Questrial",
    textAlign: "center",
    marginBottom: 7
  },
  methodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1
  },
  selectedMethodItem: {
    borderColor: "#208BC9",
    borderWidth: 0.8
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  methodText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Inter-Regular"
  },
  option: {
    marginTop: 0,
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.7,
    borderColor: "#80D1FF"
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cameraContainer: {
    alignItems: "center",
    marginVertical: 20
  },
  camera: {
    height: 250,
    width: 250,
    borderRadius: 125
  },
  placeholder: {
    backgroundColor: "#eee"
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20
  },
  submitButton: {
    flex: 1
  },
  title: {
    marginTop: 10
  },
  subtitle: {
    marginBottom: 10
  },
  message: {
    textAlign: "center",
    marginBottom: 20
  },
  permissionButton: {
    width: "80%"
  },
  listI: { fontSize: 12, fontFamily: "Questrial", lineHeight: 18 }
});
