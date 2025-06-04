import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  scrollContent: {
    flexGrow: 1
  },
  hero: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 6
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  avatarBg: {
    backgroundColor: "#BFEFFB",
    padding: 2,
    borderRadius: 100
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20
  },

  balCon: {
    backgroundColor: "#218DC9",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    marginHorizontal: 10
  },

  dFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5
  },
  balTxt: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0
  },
  balances: {
    maxWidth: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  currencyCode: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0
  },
  balAmount: { fontFamily: "Inter-Bold", fontSize: 16, marginVertical: 7 },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    alignItems: "center"
  },
  border: {
    borderColor: "#FFFFFF",
    borderWidth: 0.5,
    marginHorizontal: 10,
    height: 50
  },
  iconBg: {
    backgroundColor: "#BFEFFB",
    padding: 1,
    borderRadius: 100
  },
  addBtn: {
    width: 103,
    height: "auto",
    backgroundColor: "#105D87",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  }
});
