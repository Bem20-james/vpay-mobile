import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    paddingHorizontal: 5,
    paddingBottom: 10
  },
  avatarBox: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  avatarCon: {
    backgroundColor: "#BFEFFB",
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    backgroundColor: "#CDEBFA",
    padding: 2,
    borderRadius: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 }
  },
  heading: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  heroBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  title: {
    fontFamily: "Questrial",
    fontSize: 12,
    fontWeight: "500"
  },
  label: {
    fontSize: 15,
    fontFamily: "Inter-Bold",
    textTransform: "capitalize"
  },
  iconButton: {
    padding: 7,
    backgroundColor: "#CDEBFA",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 9
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 5,
    borderRadius: 6,
    minHeight: 48
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  optionTitle: {
    fontFamily: "Inter-Bold",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: 0
  },
  optionLabel: {
    fontFamily: "Questrial",
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: 0
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  imageCon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8
  }
});
