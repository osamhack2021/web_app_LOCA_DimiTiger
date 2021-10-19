interface Settings {
  information: {
    name: string;
    icon: string;
    branch: string;
  };
  weather: {
    location: string;
  };
  militaryDiscipline: string;
  chartDesign: 'treemap' | 'circlepacking';
  schedule?: {
    date: string;
    content: string;
  };
}
export default Settings;
