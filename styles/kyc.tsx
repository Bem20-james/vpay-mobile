import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const KycStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  container: {
    marginHorizontal: 7,
    marginTop: 10
  },
  btnCon: {
    position: "absolute",
    bottom: -350,
    left: 10,
    right: 10
  },
  heroTxt: {
    fontSize: 13,
    fontFamily: "Questrial",
    textAlign: "center",
    marginBottom: 7
  },
  methodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1
  },
  selectedMethodItem: {
    borderColor: "#208BC9",
    borderWidth: 0.8
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  methodText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Inter-Regular"
  },
  option: {
    borderRadius: 10,
    height: 45,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.7,
    borderColor: "#80D1FF"
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cameraContainer: {
    alignItems: "center",
    marginVertical: 20
  },
  camera: {
    height: 250,
    width: 250,
    borderRadius: 125
  },
  placeholder: {
    backgroundColor: "#eee"
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 10
  },
  title: {
    marginTop: 10
  },
  subtitle: {
    marginBottom: 10,
    fontFamily: "Questrial",
    fontSize: 13
  },
  message: {
    textAlign: "center",
    marginBottom: 20
  },
  permissionButton: {
    width: "80%"
  },
  listI: 
  { fontSize: 12, 
    fontFamily: "Questrial", 
    lineHeight: 18 
  },
  subtitle2: {
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12
  },
  documentTypeCard: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  selectedCard: {
    borderColor: Colors.dark.primary,
    borderWidth: 2
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  cardText: {
    marginLeft: 12,
    flex: 1
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4
  },
  cardDescription: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18
  },
  examplesContainer: {
    paddingHorizontal: 52,
    paddingBottom: 16
  },
  examplesTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6
  },
  exampleText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2
  },
  uploadArea: {
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    padding: 32,
    alignItems: "center"
  },
  uploadContent: {
    alignItems: "center"
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4
  },
  uploadSubtext: {
    fontSize: 13,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 12
  },
  supportedFormats: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },
  formatText: {
    fontSize: 11,
    color: "#3B82F6",
    fontWeight: "500"
  },
  documentPreview: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#22C55E"
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  successText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#22C55E",
    flex: 1,
    marginLeft: 8
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: "cover"
  },
  documentInfo: {
    marginBottom: 12
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  infoLabel: {
    fontSize: 13,
    opacity: 0.7
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
    marginLeft: 12
  },
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8
  },
  changeButtonText: {
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 4
  },
  requirementsNotice: {
    flexDirection: "row",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24
  },
  requirementsText: {
    marginLeft: 12,
    flex: 1
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8
  },
  requirementItem: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4
  },
  submitContainer: {
    marginBottom: 20
  },
  submitButton: {
    width: "100%"
  },
  incompleteText: {
    textAlign: "center",
    fontSize: 13,
    opacity: 0.7,
    marginTop: 8
  }
});
