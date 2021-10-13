interface Setting {
  defaults: {
    name: string;
    icon: string;
  };
  weather: {
    temperature: number;
    temperatureIndex: number;
  };
  militaryDiscipline: number;
}
export default Setting;
