export interface Profile {
  profile_id: string;
  profile_name: string;
  sites: number;
  subtotal_one_time: number;
  subtotal_monthly: number;
}

export interface ProfileLine {
  line_id: string;
  profile_id: string;
  block: string;
  item_type: string;
  description: string;
  one_time: number;
  monthly: number;
}

export interface ProfileSLA {
  profile_id: string;
  sla_name: string;
  coverage: string;
  repair_time_hours: number;
  monthly: number;
}

export interface Database {
  meta: {
    source_document: string;
    generated_at: string;
    currency: string;
    source_note?: string;
  };
  profiles: Profile[];
  profile_lines: ProfileLine[];
  profile_sla: ProfileSLA[];
}

export interface ContactInfo {
  companyName: string;
  proximusId: string;
  vatNumber: string;
  adminContact: string;
  techContact: string;
  mobile: string;
  email: string;
  siteAddress: string;
}

export enum TechAvailability {
  UNKNOWN = 'UNKNOWN',
  FIBER = 'FIBER',
  COPPER_ONLY = 'COPPER_ONLY',
  NOT_REQUIRED = 'NOT_REQUIRED' // Added for non-BE countries
}

export type Language = 'fr' | 'nl' | 'en';