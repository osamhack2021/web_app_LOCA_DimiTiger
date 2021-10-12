import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';

import useAxios from './useAxios';

import EmergencyReport from '@/types/EmergencyReport';

const useEmergencyReport = () => {
  const axios = useAxios();
  const [report, setReport] = useState<EmergencyReport>();

  const createReport = useCallback(async () => {
    if (!report) {
      const { data } = await axios.post<EmergencyReport>('/emergencys');
      setReport(data);
    }
  }, [axios, report]);

  const addReport = useCallback(
    async (content: string) => {
      if (report) {
        const { data } = await axios.patch<{}, AxiosResponse<EmergencyReport>>(
          `/emergencys/${report._id}/additional-report`,
          {
            content,
          },
        );
        setReport(data);
      }
    },
    [axios, report],
  );

  return {
    report,
    hasAdditionalReport: (report?.additionalReport.length || 0) > 0,
    createReport,
    addReport,
  };
};

export default useEmergencyReport;
