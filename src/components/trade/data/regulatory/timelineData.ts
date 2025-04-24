
export const regulatoryTimeline = [
  { 
    stage: 'Pre-shipment', 
    documents: ['Certificate of Origin', 'Commercial Invoice', 'Export Licenses'], 
    deadline: '14 days before departure' 
  },
  { 
    stage: 'During Transit', 
    documents: ['Bill of Lading', 'Packing List'], 
    deadline: 'Must accompany shipment' 
  },
  { 
    stage: 'Upon Arrival', 
    documents: ['Import Licenses', 'Compliance Certifications'], 
    deadline: 'Required for customs clearance' 
  },
  { 
    stage: 'Post-clearance', 
    documents: ['Post-import Verification', 'Recordkeeping'], 
    deadline: 'Within 30 days after clearance' 
  }
];
