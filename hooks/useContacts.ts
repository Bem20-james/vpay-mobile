// hooks/useContacts.ts
import { useState, useEffect, useCallback } from 'react';
import EncryptedContactStorage, { StoredContact } from '@/utils/encryptedStore';
import * as Contacts from 'expo-contacts';
import { useUser } from '@/contexts/UserContexts';

export const useContacts = () => {
  const [recentContacts, setRecentContacts] = useState<StoredContact[]>([]);
  const [savedBeneficiaries, setSavedBeneficiaries] = useState<StoredContact[]>([]);
  const [loading, setLoading] = useState(true);

  // Load stored contacts on mount
  useEffect(() => {
    loadStoredContacts();
  }, []);

  const loadStoredContacts = async () => {
    try {
      setLoading(true);
      const [recent, beneficiaryList] = await Promise.all([
        EncryptedContactStorage.getRecentContacts(),
        EncryptedContactStorage.getBeneficiaries()
      ]);
      
      setRecentContacts(recent);
      setSavedBeneficiaries(beneficiaryList);
    } catch (error) {
      console.error('Error loading stored contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToRecent = useCallback(async (contact: StoredContact) => {
    await EncryptedContactStorage.addToRecent(contact);
    await loadStoredContacts();
  }, []);

  const addBeneficiary = useCallback(async (contact: StoredContact) => {
    await EncryptedContactStorage.addBeneficiary(contact);
    await loadStoredContacts();
  }, []);

  const searchStoredContacts = useCallback((query: string) => {
    const recentResults = EncryptedContactStorage.searchContacts(recentContacts, query);
    const savedResults = EncryptedContactStorage.searchContacts(savedBeneficiaries, query);
    
    return {
      recent: recentResults,
      saved: savedResults
    };
  }, [recentContacts, savedBeneficiaries]);

  return {
    recentContacts,
    savedBeneficiaries,
    loading,
    addToRecent,
    addBeneficiary,
    searchStoredContacts,
    refreshStoredContacts: loadStoredContacts
  };
};

// ================================================================

// hooks/useVpayContacts.ts
export const useVpayContacts = () => {
  const [vpayContacts, setVpayContacts] = useState<StoredContact[]>([]);
  const [loading, setLoading] = useState(false);
  const { config} = useUser()

  const matchContactsWithVpay = async (phoneNumbers: Array<{name: string, phoneNumber: string}>): Promise<StoredContact[]> => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/contacts/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config}`, // Add your auth token
        },
        body: JSON.stringify({ phoneNumbers }),
      });

      if (!response.ok) throw new Error('Failed to match contacts');

      const matchedData = await response.json();
      
      return matchedData.map((contact: any) => ({
        name: contact.displayName || contact.name,
        handle: contact.vpayTag || `@${contact.username}`,
        flag: contact.country || 'NG',
        image: contact.profileImage,
        frequency: 0,
      }));
      
    } catch (error) {
      console.error('Error matching contacts with backend:', error);
      return [];
    }
  };

  const loadVpayContacts = async () => {
    try {
      setLoading(true);
      
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Contacts permission denied');
        return;
      }

      const { data: phoneContacts } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      const phoneNumbers = phoneContacts
        .filter(contact => contact.phoneNumbers && contact.phoneNumbers.length > 0)
        .map(contact => ({
          name: contact.name || 'Unknown',
          phoneNumber: contact.phoneNumbers?.[0]?.number?.replace(/\D/g, '') || '',
        }))
        .filter(contact => contact.phoneNumber.length >= 10);

      const matchedContacts = await matchContactsWithVpay(phoneNumbers);
      setVpayContacts(matchedContacts);
      
    } catch (error) {
      console.error('Error loading Vpay contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchVpayContacts = (query: string): StoredContact[] => {
    if (!query.trim()) return vpayContacts;
    
    const searchTerm = query.toLowerCase();
    return vpayContacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.handle.toLowerCase().includes(searchTerm)
    );
  };

  return {
    vpayContacts,
    loading,
    loadVpayContacts,
    searchVpayContacts
  };
};