import { StyleSheet } from "react-native";

export const btmSheetStyles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: "center"
  },

  container: {
    padding: 15
  },
  amountContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
    paddingVertical: 10
  },
  amountText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    textTransform: "capitalize"
  },
  amount: {
    fontSize: 20,
    fontFamily: "Inter-Bold"
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5
  },
  label: {
    fontSize: 13,
    fontFamily: "Questrial"
  },
  value: {
    fontSize: 14,
    fontFamily: "Inter-Medium"
  },
  paymentMethod: {
    marginTop: 20,
    padding: 10,
    borderRadius: 7
  },
  paymentText: {
    fontSize: 13,
    fontFamily: "Questrial",
    textTransform: "capitalize"
  },
  item: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  flagWrapper: {
    backgroundColor: "#E5F9FF",
    padding: 5,
    borderRadius: 50,
    marginRight: 12
  },
  flag: {
    fontSize: 18
  },
  labelWrapper: {
    flex: 1
  },
  sheetHeader: {
    padding: 10
  },
  title: {
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    borderBottomWidth: 0.7,
    borderBottomColor: "#9B9B9B",
    paddingBottom: 5
  },
  sheetItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1
  },
  sheetCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  sheetIcon: {
    borderRadius: 100,
    padding: 10
  },
  sheetLabel: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold"
  },
  bottomSheetContent: {
    paddingBottom: 24
  }
});
