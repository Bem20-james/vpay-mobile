import { StyleSheet } from "react-native";
import { CARD_SPACING, CARD_WIDTH } from "@/assets/data";

export const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  scrollContent: {
    paddingBottom: 20
  },
  carouselContainer: {
    marginTop: 10
  },
  carouselContent: {
    paddingHorizontal: 20
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING
  },
  card: {
    width: "100%",
    height: 175,
    borderRadius: 16,
    padding: 24,
    justifyContent: "space-between"
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Inter-Bold",
    fontWeight: "600"
  },
  cardFooter: {
    marginTop: "auto"
  },
  cardName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Questrial",
    fontWeight: "500",
    letterSpacing: 1
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 6
  },
  dot: {
    height: 8,
    borderRadius: 4
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 30
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    lineHeight: 38
  },
  subtitle: {
    fontSize: 32,
    fontFamily: "Inter-SemiBold",
    fontWeight: "700",
    lineHeight: 38,
    textAlign: "center",
    marginBottom: 30
  },
  featureContainer: {
    marginBottom: 20
  },
  featureHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 10
  },
  featureTitle: {
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  featureDescription: {
    fontSize: 13,
    lineHeight: 22,
    paddingLeft: 30,
    fontFamily: "Questrial",
  },
  feesContainer: {
    marginBottom: 20
  },
  feeItem: {
    flexDirection: "row",
    paddingLeft: 30,
    marginTop: 5,
    alignItems: "baseline"
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
  },
  feeText: {
    fontSize: 13,
    fontFamily: "Questrial",
    flex: 1,
    lineHeight: 22
  },
  termsButton: {
    alignSelf: "center",
    marginVertical: 10
  },
  termsText: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Questrial",
  },
  claimButton: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  claimButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },

 



});