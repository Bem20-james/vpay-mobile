import { StyleSheet } from "react-native";

export const btmSheetStyles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: "center"
  },

  container: {
    padding: 15
  },
  amount: {
    fontSize: 20,
    fontFamily: "Inter-Bold"
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  label: {
    fontSize: 13,
    fontFamily: "Questrial"
  },
  value: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold"
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
    paddingVertical: 12,
    gap:5,
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
    fontSize: 16,
    paddingBottom: 5
  },
  sheetItem: {
    paddingVertical: 14,
    paddingHorizontal: 7,
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
    fontSize: 15,
    fontFamily: "Inter-SemiBold"
  },
  bottomSheetContent: {
    paddingBottom: 24,
    paddingHorizontal: 15
  },
  indicatorHandle: {
    backgroundColor: "#208BC9",
    width: 40,
  },
  searchContainer: {
    position: 'relative',
    flexDirection: "row",
    backgroundColor: "#E9F7FF",
    borderWidth: 0.5,
    borderColor: "#c9c8c8",
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 10,
    marginHorizontal: 7,
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    width: "100%",
    color: "#000",
    fontFamily: "Inter-Regular"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
  },
  sheetCode: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
    fontStyle: 'italic',
  },
  clearButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});
