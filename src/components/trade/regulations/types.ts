
export interface RequirementTimelineItem {
  stage: string;
  documents: string[];
  deadline: string;
}

export interface RegulatoryUpdate {
  date: string;
  title: string;
  description: string;
}

export interface PermitDetail {
  permit: string;
  processingTime: string;
  fee: string;
  documentation: string[];
}

export interface CountryRequirement {
  country: string;
  requirements: string[];
}
