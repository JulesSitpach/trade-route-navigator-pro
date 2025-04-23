
export interface RequirementTimelineItem {
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

export interface RequirementItemProps {
  label: string;
  status: 'required' | 'warning' | 'not-required';
}
