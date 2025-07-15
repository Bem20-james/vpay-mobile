import { StyleSheet } from "react-native";
export const TransferStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  container: {
    marginHorizontal: 7,
    marginTop: 10
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000"
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
    textTransform: "uppercase",
    marginBottom: 10
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center"
  },
  initial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Questrial"
  },
  flagWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    marginLeft: 12
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter-Regular"
  },
  handle: {
    fontSize: 13,
    fontFamily: "Questrial"
  },
  inputField: {
    borderBottomWidth: 1.5,
    width: "100%",
    paddingHorizontal: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  }
});
