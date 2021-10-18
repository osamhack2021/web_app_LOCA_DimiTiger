import EmergencyReport from './EmergencyReport';

interface EmergencyReportQuery {
  location?: string;
  creator?: string;
  _id?: string;
  additionalReport?: EmergencyReport['additionalReport'];
  rangeStart?: Date;
  rangeEnd?: Date;
  page?: number;
  limit?: number;
  active?: boolean;
}

export default EmergencyReportQuery;
