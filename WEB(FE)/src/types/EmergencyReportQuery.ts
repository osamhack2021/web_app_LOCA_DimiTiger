interface EmergencyReportQuery {
  location?: string;
  user?: string;
  rangeStart?: Date;
  rangeEnd?: Date;
  page?: number;
  limit?: number;
  active?: boolean;
}

export default EmergencyReportQuery;
