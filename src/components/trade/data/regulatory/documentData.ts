
import { Document } from '../../types';

export const requiredDocuments: Document[] = [
  { name: 'Certificate of Origin', status: 'required' },
  { name: 'Commercial Invoice', status: 'required' },
  { name: 'Packing List', status: 'required' },
  { name: 'Bill of Lading', status: 'required' },
  { name: 'Import License', status: 'warning' },
  { name: 'Safety Compliance Certifications', status: 'required' },
  { name: 'Phytosanitary Certificate', status: 'not-required' }
];
