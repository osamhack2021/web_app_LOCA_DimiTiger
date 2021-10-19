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
}
export default Settings;
