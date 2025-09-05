import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import CustomButton from "@/components/CustomButton";
import Navigator from "@/components/Navigator";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { KycStyles as styles } from "@/styles/kyc";
import { DocumentUploadProps } from "@/types/kyc";
import { MAX_FILE_SIZE } from "@/constants/defaults";
import { DOCUMENT_TYPES } from "@/constants/defaults";

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onSubmit,
  loading = false,
  onBack
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [selectedDocumentType, setSelectedDocumentType] = useState<
    string | null
  >(null);
  const [uploadedDocument, setUploadedDocument] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const cardBg = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const validateFile = (
    size: number,
    type: string
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (size && size > MAX_FILE_SIZE) {
      errors.push(
        `File size must not exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      );
    }

    if (type && !["image/jpeg", "image/png"].includes(type)) {
      errors.push("File type not supported. Please use JPG or PNG");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const validateSubmission = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!selectedDocumentType) {
      errors.push("Please select a document type");
    }

    if (!uploadedDocument) {
      errors.push("Please upload a document");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: galleryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || galleryStatus !== "granted") {
        Alert.alert(
          "Permissions Required",
          "Camera and gallery permissions are needed to upload documents.",
          [{ text: "OK" }]
        );
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert("Error", "Failed to request permissions");
      return false;
    }
  };

  const handleDocumentTypeSelect = (typeId: string) => {
    setSelectedDocumentType(typeId);
    setUploadedDocument(null);
    setValidationErrors([]);
  };

  const showUploadOptions = () => {
    if (!selectedDocumentType) {
      Alert.alert(
        "Select Document Type",
        "Please select a document type first"
      );
      return;
    }

    Alert.alert(
      "Upload Document",
      "Choose how you want to upload your document",
      [
        { text: "Take Photo", onPress: () => takePhoto() },
        { text: "Choose from Gallery", onPress: () => pickFromGallery() },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsUploading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: false
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const fileSize = asset.fileSize || 0;
        const fileType = "image/jpeg";

        const validation = validateFile(fileSize, fileType);
        if (!validation.isValid) {
          setValidationErrors(validation.errors);
          Alert.alert("File Validation Error", validation.errors.join("\n"));
          return;
        }

        const base64 = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: FileSystem.EncodingType.Base64
        });

        const fileBase64 = `data:${fileType};base64,${base64}`;

        setUploadedDocument(fileBase64);
        setValidationErrors([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const pickFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsUploading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: false
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const fileSize = asset.fileSize || 0;
        const fileType = "image/jpeg";

        const validation = validateFile(fileSize, fileType);
        if (!validation.isValid) {
          setValidationErrors(validation.errors);
          Alert.alert("File Validation Error", validation.errors.join("\n"));
          return;
        }

        const base64 = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: FileSystem.EncodingType.Base64
        });

        const fileBase64 = `data:${fileType};base64,${base64}`;

        setUploadedDocument(fileBase64);
        setValidationErrors([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeDocument = () => {
    Alert.alert(
      "Remove Document",
      "Are you sure you want to remove this document?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setUploadedDocument(null);
            setValidationErrors([]);
          }
        }
      ]
    );
  };

  const handleSubmit = () => {
    const validation = validateSubmission();

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      Alert.alert("Form Incomplete", validation.errors.join("\n"), [
        { text: "OK" }
      ]);
      return;
    }

    if (selectedDocumentType && uploadedDocument) {
      onSubmit({
        documentType: selectedDocumentType,
        document: uploadedDocument
      });
    }
  };

  const selectedType = DOCUMENT_TYPES.find(
    (type) => type.id === selectedDocumentType
  );
  const isFormComplete = selectedDocumentType && uploadedDocument;

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Navigator title="Proof of Address" onBack={onBack} />

        <View style={styles.container}>
          <ThemedText style={styles.subtitle}>
            Upload a recent document (not older than 3 months) that shows your
            current address
          </ThemedText>

          {validationErrors.length > 0 && (
            <View
              style={{
                backgroundColor: "#FEF2F2",
                borderColor: "#DC2626",
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                marginBottom: 16
              }}
            >
              {validationErrors.map((error, index) => (
                <ThemedText
                  key={index}
                  style={{
                    color: "#DC2626",
                    fontSize: 14,
                    marginBottom: index < validationErrors.length - 1 ? 4 : 0
                  }}
                >
                  • {error}
                </ThemedText>
              ))}
            </View>
          )}

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Select Document Type
            </ThemedText>

            {DOCUMENT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.documentTypeCard,
                  { backgroundColor: cardBg },
                  selectedDocumentType === type.id && styles.selectedCard
                ]}
                onPress={() => handleDocumentTypeSelect(type.id)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardLeft}>
                    <MaterialIcons
                      name={type.icon}
                      size={24}
                      color={
                        selectedDocumentType === type.id
                          ? Colors.dark.primary
                          : "#6B7280"
                      }
                    />
                    <View style={styles.cardText}>
                      <ThemedText style={styles.cardTitle}>
                        {type.label}
                      </ThemedText>
                      <ThemedText style={styles.cardDescription}>
                        {type.description}
                      </ThemedText>
                    </View>
                  </View>
                  <MaterialIcons
                    name={
                      selectedDocumentType === type.id
                        ? "radio-button-checked"
                        : "radio-button-unchecked"
                    }
                    size={20}
                    color={
                      selectedDocumentType === type.id
                        ? Colors.dark.primary
                        : "#6B7280"
                    }
                  />
                </View>

                {selectedDocumentType === type.id && (
                  <View style={styles.examplesContainer}>
                    <ThemedText style={styles.examplesTitle}>
                      Examples:
                    </ThemedText>
                    {type.examples.map((example, index) => (
                      <ThemedText key={index} style={styles.exampleText}>
                        • {example}
                      </ThemedText>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {selectedDocumentType && (
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>
                Upload {selectedType?.label}
              </ThemedText>

              {!uploadedDocument ? (
                <TouchableOpacity
                  style={[styles.uploadArea, { backgroundColor: cardBg }]}
                  onPress={showUploadOptions}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <View style={styles.uploadContent}>
                      <MaterialIcons
                        name="cloud-upload"
                        size={48}
                        color="#9CA3AF"
                      />
                      <ThemedText style={styles.uploadText}>
                        Uploading...
                      </ThemedText>
                    </View>
                  ) : (
                    <View style={styles.uploadContent}>
                      <MaterialIcons
                        name="cloud-upload"
                        size={48}
                        color="#6B7280"
                      />
                      <ThemedText style={styles.uploadText}>
                        Tap to upload document
                      </ThemedText>
                      <ThemedText style={styles.uploadSubtext}>
                        Take photo or choose from gallery
                      </ThemedText>
                      <View style={styles.supportedFormats}>
                        <ThemedText style={styles.formatText}>
                          Supported: JPG, PNG (Max 10MB)
                        </ThemedText>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <View
                  style={[styles.documentPreview, { backgroundColor: cardBg }]}
                >
                  <View style={styles.previewHeader}>
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color="#22C55E"
                    />
                    <ThemedText style={styles.successText}>
                      Document uploaded successfully
                    </ThemedText>
                    <TouchableOpacity onPress={removeDocument}>
                      <MaterialIcons name="close" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>

                  {uploadedDocument.startsWith("data:image") && (
                    <Image
                      source={{ uri: uploadedDocument }}
                      style={styles.previewImage}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.changeButton}
                    onPress={showUploadOptions}
                  >
                    <MaterialIcons
                      name="edit"
                      size={16}
                      color={Colors.dark.primary}
                    />
                    <ThemedText
                      style={[
                        styles.changeButtonText,
                        { color: Colors.dark.primary }
                      ]}
                    >
                      Change Document
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          <View style={styles.submitContainer}>
            <CustomButton
              title={loading ? "Submitting..." : "Submit Document"}
              handlePress={handleSubmit}
              disabled={!isFormComplete || loading || isUploading}
              btnStyles={[
                styles.submitButton,
                {
                  opacity: isFormComplete && !loading && !isUploading ? 1 : 0.6
                }
              ]}
              isLoading={loading}
            />

            {!isFormComplete && (
              <ThemedText style={styles.incompleteText}>
                {!selectedDocumentType
                  ? "Please select a document type to continue"
                  : "Please upload a document to continue"}
              </ThemedText>
            )}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </>
  );
};

export default DocumentUpload;
