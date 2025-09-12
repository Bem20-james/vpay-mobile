import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'vpay_contacts';
const RECENT_CONTACTS_KEY = 'vpay_recent';

export interface StoredContact {
  name: string;
  handle: string;
  flag?: string;
  image?: string;
  lastUsed?: string;
  frequency: number;
}

class EncryptedContactStorage {
  private encryptionKey: string;

  constructor() {
    // In production, derive this from user's PIN/biometric or server
    this.encryptionKey = 'your-app-encryption-key-here';
  }

  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  async saveBeneficiaries(contacts: StoredContact[]): Promise<void> {
    try {
      const encrypted = this.encrypt(JSON.stringify(contacts));
      await SecureStore.setItemAsync(STORAGE_KEY, encrypted);
    } catch (error) {
      console.error('Error saving beneficiaries:', error);
    }
  }

  async getBeneficiaries(): Promise<StoredContact[]> {
    try {
      const encrypted = await SecureStore.getItemAsync(STORAGE_KEY);
      if (!encrypted) return [];
      
      const decrypted = this.decrypt(encrypted);
      return JSON.parse(decrypted) || [];
    } catch (error) {
      console.error('Error getting beneficiaries:', error);
      return [];
    }
  }

  async saveRecentContacts(contacts: StoredContact[]): Promise<void> {
    try {
      // Keep only last 10 recent contacts
      const recentContacts = contacts
        .sort((a, b) => new Date(b.lastUsed || '').getTime() - new Date(a.lastUsed || '').getTime())
        .slice(0, 10);
      
      const encrypted = this.encrypt(JSON.stringify(recentContacts));
      await SecureStore.setItemAsync(RECENT_CONTACTS_KEY, encrypted);
    } catch (error) {
      console.error('Error saving recent contacts:', error);
    }
  }

  async getRecentContacts(): Promise<StoredContact[]> {
    try {
      const encrypted = await SecureStore.getItemAsync(RECENT_CONTACTS_KEY);
      if (!encrypted) return [];
      
      const decrypted = this.decrypt(encrypted);
      return JSON.parse(decrypted) || [];
    } catch (error) {
      console.error('Error getting recent contacts:', error);
      return [];
    }
  }

  async addToRecent(contact: StoredContact): Promise<void> {
    try {
      const recentContacts = await this.getRecentContacts();
      
      // Remove if already exists
      const filtered = recentContacts.filter(c => c.handle !== contact.handle);
      
      // Add to beginning with current timestamp
      const updatedContact = {
        ...contact,
        lastUsed: new Date().toISOString(),
        frequency: (contact.frequency || 0) + 1
      };
      
      filtered.unshift(updatedContact);
      await this.saveRecentContacts(filtered);
    } catch (error) {
      console.error('Error adding to recent:', error);
    }
  }

  async addBeneficiary(contact: StoredContact): Promise<void> {
    try {
      const beneficiaries = await this.getBeneficiaries();
      
      // Check if already exists
      const exists = beneficiaries.find(c => c.handle === contact.handle);
      if (exists) return;
      
      beneficiaries.push(contact);
      await this.saveBeneficiaries(beneficiaries);
    } catch (error) {
      console.error('Error adding beneficiary:', error);
    }
  }

  searchContacts(contacts: StoredContact[], query: string): StoredContact[] {
    if (!query.trim()) return contacts;
    
    const searchTerm = query.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.handle.toLowerCase().includes(searchTerm)
    );
  }
}

export default new EncryptedContactStorage();
