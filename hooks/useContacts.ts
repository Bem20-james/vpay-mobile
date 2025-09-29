// hooks/useContacts.ts
import { useState, useEffect, useCallback } from 'react';
import EncryptedContactStorage, { StoredContact } from '@/utils/encryptedStore';
import * as Contacts from 'expo-contacts';
import { useUser } from '@/contexts/UserContexts';
import axios, {AxiosError} from 'axios';
import { SERVER_BASE_URL } from '../constants/Paths';

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

// hooks/useVpayContacts.ts



type BackendContact = {
  displayName?: string;
  name?: string;
  vpayTag?: string;
  username?: string;
  country?: string;
  profileImage?: string;
};

export const useVpayContacts = () => {
  const [vpayContacts, setVpayContacts] = useState<StoredContact[]>([]);
  const [loading, setLoading] = useState(false);
  const { config } = useUser(); // auth token

  /**
   * Matches given phone numbers against backend vPay users
   */
  const matchContactsWithVpay = async (
    phoneNumbers: Array<{ name: string; phoneNumber: string }>
  ): Promise<StoredContact[]> => {
    try {
      const response = await axios.post<BackendContact[]>(
        `${SERVER_BASE_URL}/user/contact-users/resolve`,
        { phoneNumbers },
        config

      );

      return response.data.map((contact) => ({
        name: contact.displayName || contact.name || "Unknown",
        handle: contact.vpayTag || `@${contact.username ?? "unknown"}`,
        flag: contact.country || "NG",
        image: contact.profileImage,
        frequency: 0,
      }));
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error matching contacts with backend:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      return [];
    }
  };

  /**
   * Loads local contacts from device, filters them,
   * and attempts to resolve against backend
   */
  const loadVpayContacts = async () => {
    try {
      setLoading(true);

      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Contacts permission denied");
        return;
      }

      const { data: phoneContacts } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      const phoneNumbers = phoneContacts
        .filter(
          (c) => c.phoneNumbers && c.phoneNumbers.length > 0
        )
        .map((c) => ({
          name: c.name || "Unknown",
          phoneNumber:
            c.phoneNumbers?.[0]?.number?.replace(/\D/g, "") || "",
        }))
        .filter((c) => c.phoneNumber.length >= 10);

      if (!phoneNumbers.length) {
        console.log("No valid phone numbers found in contacts");
        return;
      }

      const matchedContacts = await matchContactsWithVpay(phoneNumbers);
      setVpayContacts(matchedContacts);
    } catch (error) {
      console.error("❌ Error loading Vpay contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Local search for contacts
   */
  const searchVpayContacts = (query: string): StoredContact[] => {
    if (!query.trim()) return vpayContacts;

    const searchTerm = query.toLowerCase();
    return vpayContacts.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm) ||
        c.handle.toLowerCase().includes(searchTerm)
    );
  };

  return {
    vpayContacts,
    loading,
    loadVpayContacts,
    searchVpayContacts,
  };
};
