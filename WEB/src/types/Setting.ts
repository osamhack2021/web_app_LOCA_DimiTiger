interface Setting {
  defaults: {
    name: string;
    icon: string;
    belong: string;
  };
  weather: {
    location: string;
  };
  militaryDiscipline: string;
  chartDesign: boolean;
}
export default Setting;
