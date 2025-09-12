// components/ContactSection.tsx
import React from 'react';
import { FlatList, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { RenderItem } from '@/components/RenderItems';
import { Feather } from '@expo/vector-icons';
import { StoredContact } from '@/utils/encryptedStore';

interface ContactSectionProps {
  title: string;
  contacts: StoredContact[];
  keyPrefix: string;
  loading?: boolean;
  onRefresh?: () => void;
  emptyMessage?: string;
  sectionHeaderStyle: any;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  contacts,
  keyPrefix,
  loading = false,
  onRefresh,
  emptyMessage,
  sectionHeaderStyle
}) => {
  if (loading) {
    return (
      <View style={{ marginTop: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ThemedText style={sectionHeaderStyle}>
            {title} (Loading...)
          </ThemedText>
        </View>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#208BC9" />
          <ThemedText style={{ marginTop: 10, fontSize: 12, opacity: 0.6 }}>
            Loading contacts...
          </ThemedText>
        </View>
      </View>
    );
  }

  if (contacts.length === 0 && emptyMessage) {
    return (
      <View style={{ marginTop: 15 }}>
        <ThemedText style={sectionHeaderStyle}>{title}</ThemedText>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <ThemedText style={{ opacity: 0.6, fontSize: 12 }}>
            {emptyMessage}
          </ThemedText>
        </View>
      </View>
    );
  }

  if (contacts.length === 0) return null;

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => `${keyPrefix}-${item.handle}`}
      nestedScrollEnabled={true}
      scrollEnabled={false}
      renderItem={({ item }) => <RenderItem item={item} />}
      ListHeaderComponent={
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
          <ThemedText style={sectionHeaderStyle}>{title}</ThemedText>
          {onRefresh && (
            <TouchableOpacity onPress={onRefresh}>
              <Feather name="refresh-cw" size={16} color="#208BC9" />
            </TouchableOpacity>
          )}
        </View>
      }
    />
  );
};

export default ContactSection;