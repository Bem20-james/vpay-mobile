import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import CustomButton from "@/components/CustomButton";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

interface DocumentType {
  id: string;
  label: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  examples: string[];
}

interface UploadedDocument {
  uri: string;
  name: string;
  type: string;
  size: number;
}

interface DocumentUploadProps {
  onBack: () => void;
  onSubmit: (documentData: {
    documentType: string;
    document: UploadedDocument;
  }) => void;
  loading?: boolean;
}

const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: "utility_bill",
    label: "Utility Bill",
    description: "Recent electricity, water, gas, or internet bill",
    icon: "receipt",
    examples: ["Electricity bill", "Water bill", "Gas bill", "Internet bill"]
  },
  {
    id: "bank_statement",
    label: "Bank Statement",
    description: "Official bank statement showing your address",
    icon: "account-balance",
    examples: ["Monthly statement", "Account summary", "Transaction history"]
  },
  {
    id: "rental_agreement",
    label: "Rental Agreement",
    description: "Lease or rental contract for your current address",
    icon: "home",
    examples: ["Lease agreement", "Rental contract", "Housing agreement"]
  },
  {
    id: "government_document",
    label: "Government Document",
    description: "Tax document, voter registration, or official mail",
    icon: "account-balance-wallet",
    examples: ["Tax document", "Voter registration", "Government correspondence"]
  }
];

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onSubmit,
  loading = false,
  onBack
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>(null);
  const [uploadedDocument, setUploadedDocument] = useState<UploadedDocument | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'camera' | 'gallery' | 'files' | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const backgroundColor = isDark ? Colors.dark.background : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const cardBg = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  // Request permissions
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Camera and gallery permissions are needed to upload documents.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // Handle document type selection
  const handleDocumentTypeSelect = (typeId: string) => {
    setSelectedDocumentType(typeId);
    setUploadedDocument(null);
    setUploadMethod(null);
  };

  // Show upload method options
  const showUploadOptions = () => {
    Alert.alert(
      'Upload Document',
      'Choose how you want to upload your document',
      [
        { text: 'Take Photo', onPress: () => takePhoto() },
        { text: 'Choose from Gallery', onPress: () => pickFromGallery() },
        { text: 'Browse Files', onPress: () => pickDocument() },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  // Take photo with camera
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
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setUploadedDocument({
          uri: asset.uri,
          name: `document_photo_${Date.now()}.jpg`,
          type: 'image/jpeg',
          size: asset.fileSize || 0
        });
        setUploadMethod('camera');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Pick from gallery
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
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setUploadedDocument({
          uri: asset.uri,
          name: asset.fileName || `document_${Date.now()}.jpg`,
          type: 'image/jpeg',
          size: asset.fileSize || 0
        });
        setUploadMethod('gallery');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Pick document file
  const pickDocument = async () => {
    setIsUploading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setUploadedDocument({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || 'application/pdf',
          size: asset.size || 0
        });
        setUploadMethod('files');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Remove uploaded document
  const removeDocument = () => {
    Alert.alert(
      'Remove Document',
      'Are you sure you want to remove this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setUploadedDocument(null);
            setUploadMethod(null);
          }
        }
      ]
    );
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle final submission
  const handleSubmit = () => {
    if (!selectedDocumentType || !uploadedDocument) {
      Alert.alert('Missing Information', 'Please select a document type and upload a document.');
      return;
    }

    onSubmit({
      documentType: selectedDocumentType,
      document: uploadedDocument
    });
  };

  const selectedType = DOCUMENT_TYPES.find(type => type.id === selectedDocumentType);
  const isFormComplete = selectedDocumentType && uploadedDocument;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Navigator title="Proof of Address" onBack={onBack} />
        
        <View style={styles.container}>
          <ThemedText style={styles.subtitle}>
            Upload a recent document (not older than 3 months) that shows your current address
          </ThemedText>

          {/* Document Type Selection */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Step 1: Select Document Type
            </ThemedText>
            
            {DOCUMENT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.documentTypeCard,
                  { backgroundColor: cardBg },
                  selectedDocumentType === type.id && styles.selectedCard,
                ]}
                onPress={() => handleDocumentTypeSelect(type.id)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardLeft}>
                    <MaterialIcons
                      name={type.icon}
                      size={24}
                      color={selectedDocumentType === type.id ? Colors.dark.primary : '#6B7280'}
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
                    name={selectedDocumentType === type.id ? "radio-button-checked" : "radio-button-unchecked"}
                    size={20}
                    color={selectedDocumentType === type.id ? Colors.dark.primary : '#6B7280'}
                  />
                </View>
                
                {selectedDocumentType === type.id && (
                  <View style={styles.examplesContainer}>
                    <ThemedText style={styles.examplesTitle}>Examples:</ThemedText>
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

          {/* Document Upload Section */}
          {selectedDocumentType && (
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>
                Step 2: Upload {selectedType?.label}
              </ThemedText>

              {!uploadedDocument ? (
                <TouchableOpacity
                  style={[styles.uploadArea, { backgroundColor: cardBg }]}
                  onPress={showUploadOptions}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <View style={styles.uploadContent}>
                      <MaterialIcons name="cloud-upload" size={48} color="#9CA3AF" />
                      <ThemedText style={styles.uploadText}>Uploading...</ThemedText>
                    </View>
                  ) : (
                    <View style={styles.uploadContent}>
                      <MaterialIcons name="cloud-upload" size={48} color="#6B7280" />
                      <ThemedText style={styles.uploadText}>
                        Tap to upload document
                      </ThemedText>
                      <ThemedText style={styles.uploadSubtext}>
                        Take photo, choose from gallery, or browse files
                      </ThemedText>
                      <View style={styles.supportedFormats}>
                        <ThemedText style={styles.formatText}>
                          Supported: JPG, PNG, PDF (Max 10MB)
                        </ThemedText>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={[styles.documentPreview, { backgroundColor: cardBg }]}>
                  <View style={styles.previewHeader}>
                    <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                    <ThemedText style={styles.successText}>Document uploaded successfully</ThemedText>
                    <TouchableOpacity onPress={removeDocument}>
                      <MaterialIcons name="close" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                  
                  {uploadedDocument.type.startsWith('image/') && (
                    <Image source={{ uri: uploadedDocument.uri }} style={styles.previewImage} />
                  )}
                  
                  <View style={styles.documentInfo}>
                    <View style={styles.infoRow}>
                      <ThemedText style={styles.infoLabel}>File name:</ThemedText>
                      <ThemedText style={styles.infoValue} numberOfLines={1}>
                        {uploadedDocument.name}
                      </ThemedText>
                    </View>
                    <View style={styles.infoRow}>
                      <ThemedText style={styles.infoLabel}>File size:</ThemedText>
                      <ThemedText style={styles.infoValue}>
                        {formatFileSize(uploadedDocument.size)}
                      </ThemedText>
                    </View>
                    <View style={styles.infoRow}>
                      <ThemedText style={styles.infoLabel}>Type:</ThemedText>
                      <ThemedText style={styles.infoValue}>
                        {uploadedDocument.type}
                      </ThemedText>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.changeButton}
                    onPress={showUploadOptions}
                  >
                    <MaterialIcons name="edit" size={16} color={Colors.dark.primary} />
                    <ThemedText style={[styles.changeButtonText, { color: Colors.dark.primary }]}>
                      Change Document
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {/* Requirements Notice */}
          <View style={styles.requirementsNotice}>
            <MaterialIcons name="info" size={20} color="#3B82F6" />
            <View style={styles.requirementsText}>
              <ThemedText style={styles.requirementsTitle}>Document Requirements:</ThemedText>
              <ThemedText style={styles.requirementItem}>• Document must be issued within the last 3 months</ThemedText>
              <ThemedText style={styles.requirementItem}>• Your full name and address must be clearly visible</ThemedText>
              <ThemedText style={styles.requirementItem}>• Document must be in good quality (not blurry or damaged)</ThemedText>
              <ThemedText style={styles.requirementItem}>• Address must match the one provided in your profile</ThemedText>
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.submitContainer}>
            <CustomButton
              title={loading ? "Submitting..." : "Submit Document"}
              handlePress={handleSubmit}
              disabled={!isFormComplete || loading || isUploading}
              btnStyles={[
                styles.submitButton,
                { opacity: isFormComplete ? 1 : 0.6 }
              ]}
              isLoading={loading}
            />
            
            {!isFormComplete && selectedDocumentType && (
              <ThemedText style={styles.incompleteText}>
                Please upload a document to continue
              </ThemedText>
            )}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitle: {
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  documentTypeCard: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedCard: {
    borderColor: Colors.dark.primary,
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18,
  },
  examplesContainer: {
    paddingHorizontal: 52,
    paddingBottom: 16,
  },
  examplesTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  uploadArea: {
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    padding: 32,
    alignItems: 'center',
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 13,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 12,
  },
  supportedFormats: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  formatText: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: '500',
  },
  documentPreview: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  successText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
    flex: 1,
    marginLeft: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  documentInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  changeButtonText: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
  },
  requirementsNotice: {
    flexDirection: 'row',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  requirementsText: {
    marginLeft: 12,
    flex: 1,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  submitContainer: {
    marginBottom: 20,
  },
  submitButton: {
    width: '100%',
  },
  incompleteText: {
    textAlign: 'center',
    fontSize: 13,
    opacity: 0.7,
    marginTop: 8,
  },
});

export default DocumentUpload;