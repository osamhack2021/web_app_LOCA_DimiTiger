import User from './User';

interface EmergencyReport {
  _id: string;
  creator: User;
  active: boolean;
  additionalReport: { content: string; createdAt: Date }[];
  createdAt: Date;
  updatedAt: Date;
}

export default EmergencyReport;
