import { Colors } from "@/constants/Colors";
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
    backgroundColor: "#fbffffff",
    borderWidth: 0.5,
    borderColor: "#c9c8c8",
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10
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
    marginBottom: 8,
    width: "100%",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 7
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
    width: 30,
    height: 30,
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
    borderBottomWidth: 1,
    width: "100%",
    paddingHorizontal: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  recipientContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 30
  },
  recipient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
    objectFit: "cover"
  },
  recipientName: {
    fontSize: 15,
    fontFamily: "Inter-Bold",
    textTransform: "uppercase"
  },
  recipientDetails: {
    fontSize: 12,
    fontFamily: "Questrial",
    marginTop: 2,
    color: "#9B9B9B"
  },
  inputBox: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  label: {
    color: "#5f5f5f",
    fontSize: 12,
    fontFamily: "Questrial",
    marginBottom: 8
  },
  amountArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: Colors.light.primaryDark2,
    borderBottomWidth: 0.7,
    marginTop: 10
  },
  payMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  balanceSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  splitInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  currencySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#208BC9",
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 10
  },
  currencyCode: {
    color: "#fff",
    fontFamily: "Inter-Bold",
    marginLeft: 6,
    marginRight: 4
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontFamily: "Inter-Bold"
  },
  mainBal: {
    marginTop: 5,
    fontSize: 20,
    fontFamily: "Inter-Bold"
  },
  balances: {
    marginTop: 10,
    color: "#2c404aff",
    fontSize: 12,
    fontFamily: "Questrial"
  },
  noteInput: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginTop: 4,
    marginVertical: 15
  },
  itemContainer: {
    marginTop: 5,
    padding: 10
  },
  itemContent: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  iconCircle: {
    padding: 7,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d8f0fdff"
  },
  flagItem: {
    borderRadius: 2
  },
  txtBorder: {
    borderBottomColor: "#9b9b9b",
    borderBottomWidth: 0.5,
    width: "100%",
    paddingVertical: 5
  },
  primaryText: {
    fontFamily: "Inter-Regular",
    fontSize: 15
  },
  lastUsed: {
    fontSize: 10,
    marginTop: 2,
    fontStyle: "italic"
  },
  flag: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    borderRadius: 20
  }
});
