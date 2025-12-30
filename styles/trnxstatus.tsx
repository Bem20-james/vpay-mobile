import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
    paddingVertical: 5,
    alignItems: "center"
  },
  iconContainer: {
    width: 110,
    height: 110,
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
    fontSize: 35,
    fontFamily: "Inter-Bold",
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 40
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
    marginBottom: 20,
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
    marginBottom: 12
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

export const trnxHistory = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
    height: "100%"
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10
  },
  header:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
  },
  amount: {
    fontSize: 30,
    fontFamily: "Inter-Bold",
    color: "#BF281C",
    lineHeight: 36,
  },
  detailsContainer: {
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  detailLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#9B9B9B"
  },
  detailValue: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
    fontWeight: "500"
  },
  networkContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 100
  },
  statusSuccess: {
    color: "#66C61C",
    backgroundColor: "#F0F9E8",
    paddingHorizontal: 5,
    borderRadius: 30
  },
  statusFailed: {
    color: "#66C61C",
    backgroundColor: "#F0F9E8",
    paddingHorizontal: 5,
    borderRadius: 30
  },
  flex: {
    flexDirection: "row",
    alignItems: "center"
  },
  actionBox: {
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 10,
    padding: 10
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  label: {
    fontFamily: "Questrial",
    fontSize: 15,
    letterSpacing: 0
  },
  colBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  iconWrapper: {
    padding: 4,
    borderRadius: 30,
    marginBottom: 8,
    backgroundColor: "#e1c5c3ff"
  }
});
