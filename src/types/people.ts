export type PersonType = 'FISICA' | 'JURIDICA' | 'PRODUTOR_RURAL';

export interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isMain: boolean;
}

export interface Contact {
  id: string;
  value: string;
  type: 'EMAIL' | 'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'FACEBOOK' | 'LINKEDIN';
  description?: string;
  isMain: boolean;
}

export interface Document {
  id: string;
  number: string;
  typeId: string;
  isMain: boolean;
  expirationDate?: Date;
}

export interface DocumentType {
  id: string;
  name: string;
  code: string;
  mask?: string;
  validation?: string;
}

export interface RelationshipGroup {
  id: string;
  name: string;
  description?: string;
}

export interface ContactRelationship {
  contactId: string;
  personId: string;
  groupId: string;
}

export interface Person {
  id: string;
  type: PersonType;
  name: string;
  tradeName?: string;
  birthDate?: Date;
  addresses: Address[];
  contacts: Contact[];
  documents: Document[];
  relationships: ContactRelationship[];
  createdAt: Date;
  updatedAt: Date;
}