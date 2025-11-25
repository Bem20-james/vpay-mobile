import { StyleSheet } from "react-native";

export const swapStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
    position: "relative",
    height: "100%"
  },
  sectionTitle: {
    fontSize: 25,
    fontFamily: "Inter-Bold",
    paddingTop: 25,
    lineHeight: 30
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Questrial",
    color: "#9B9B9B",
    marginBottom: 24,
    lineHeight: 30
  },
  cardFlx: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  card: {
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative"
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    lineHeight: 18
  },
  input: {
    fontSize: 25,
    fontFamily: "Inter-Bold"
  },
  useMax: {
    color: "#208BC9",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
    fontFamily: "Questrial"
  },
  usdEqv: {
    color: "#999",
    fontSize: 14
  },
  switchContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -20 }],
    zIndex: 10,
    backgroundColor: "#E9F7FF",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  tokenSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 12
  },
  tokenImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff"
  },
  tokenSymbol: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Inter-SemiBold"
  },
  tokenName: {
    fontSize: 12,
    color: "#888",
    fontFamily: "Questrial"
  },
});
