import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold"
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },
  accountCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  cardLabel: {
    fontSize: 12,
    fontFamily: "Inter",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  coinBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#D4A855",
    justifyContent: "center",
    alignItems: "center"
  },
  accountNumberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  accountNumber: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginRight: 8
  },
  copyButton: {
    padding: 4
  },
  accountName: {
    fontSize: 11,
    fontFamily: "Inter",
    letterSpacing: 0.3
  },
  linkedIdCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  linkedIdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  linkedIdLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium"
  },
  linkedIdRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  linkedIdValue: {
    fontSize: 14,
    fontFamily: "Inter"
  },
  limitInfoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  limitInfoLabel: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    marginBottom: 8
  },
  limitInfoText: {
    fontSize: 13,
    fontFamily: "Inter",
    lineHeight: 20
  },
  benefitsCard: {
    borderRadius: 12,
    padding: 16
  },
  benefitsTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 16
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 8
  },
  tableHeaderText: {
    fontSize: 11,
    fontFamily: "Inter-Medium",
    lineHeight: 14
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 8
  },
  tableRowCurrent: {
    backgroundColor: "#2A2A2A"
  },
  tierCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  tierText: {
    fontSize: 14,
    fontFamily: "Inter-Medium"
  },
  currentBadge: {
    backgroundColor: "rgba(0, 208, 132, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4
  },
  currentBadgeText: {
    fontSize: 10,
    fontFamily: "Inter-SemiBold"
  },
  tableCellText: {
    fontSize: 14,
    fontFamily: "Inter"
  }
});