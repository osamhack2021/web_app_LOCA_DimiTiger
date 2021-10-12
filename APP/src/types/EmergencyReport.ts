interface EmergencyReport {
  _id: string;
  active: boolean;
  additionalReport: { content: string; createdAt: Date }[];
  createdAt: Date;
  updatedAt: Date;
}

export default EmergencyReport;
