interface Setting {
  defaults: {
    name: string;
    icon: string;
    belong: string;
  };
  weather: {
    location: string;
    temperature: number;
    temperatureIndex: number;
  };
  militaryDiscipline: string;
  chartDesign: boolean;
}
export default Setting;
