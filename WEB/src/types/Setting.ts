interface Setting {
  defaults: {
    name: string;
    icon: string;
    belong: string;
  };
  weather: {
    temperature: number;
    temperatureIndex: number;
  };
  militaryDiscipline: number;
  chartDesign: boolean;
}
export default Setting;
