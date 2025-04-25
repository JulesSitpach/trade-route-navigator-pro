
export interface RegulationsTabProps {
  productCategory: string;
  originCountry: string;
  destinationCountry: string;
  isDangerous: boolean;
  transportMode: string;
}

export interface RequiredDocument {
  name: string;
  status: 'required' | 'warning' | 'not-required';
}

export interface TimelineStage {
  stage: string;
  documents: string[];
  deadline: string;
}

export interface CountryRequirement {
  country: string;
  requirements: string[];
}

export interface PermitInfo {
  permit: string;
  processingTime: string;
  fee: string;
  documentation: string[];
}

export interface RegulatoryUpdate {
  date: string;
  title: string;
  description: string;
}
