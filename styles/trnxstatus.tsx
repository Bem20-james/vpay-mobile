import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
    paddingVertical: 10,
    alignItems: "center"
  },
  iconContainer: {
    width: 130,
    height: 130,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginBottom: 12,
    textAlign: "center"
  },
  amount: {
    fontSize: 30,
    fontFamily: "Inter-Bold",
    marginBottom: 5,
    textAlign: "center",
    lineHeight: 35
  },
  description: {
    fontSize: 14,
    fontFamily: "Questrial",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20
  },
  detailsCard: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    marginBottom: 12
  },
  divider: {
    height: 1,
    backgroundColor: "#80D1FF",
    marginBottom: 16,
    opacity: 0.3
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 5
  },
  detailLabel: {
    fontSize: 13,
    fontFamily: "Questrial",
    flex: 1
  },
  detailValue: {
    fontSize: 11.6,
    fontFamily: "Inter-Medium",
    flex: 1,
    textAlign: "right"
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 16
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Questrial"
  }
});