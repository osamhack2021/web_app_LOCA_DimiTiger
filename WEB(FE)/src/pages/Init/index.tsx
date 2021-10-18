import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import './Init.css';

import { useAddSetting } from '@/api/settings';
import { settingsState } from '@/atoms';
import useAxios from '@/hooks/useAxios';
import Settings from '@/types/Settings';

const Init = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [settings, setSettings] = useRecoilState(settingsState);
  const [data, setData] = useState<{
    file: File | null;
    previewURL: string | ArrayBuffer | null;
  }>({
    file: null,
    previewURL: './icons/addPhoto.svg',
  });

  const axios = useAxios();
  const fileUploader = async (formData: FormData) => {
    const { filename } = (await axios.post(`/files/upload`, formData)).data;
    return filename;
  };

  const addSetting = useAddSetting();

  const initialize = async ({ branch, name }: Settings['information']) => {
    const formData = new FormData();
    if (data.file != null) {
      formData.append('file', data.file);
      fileUploader(formData).then((filename: string) => {
        const newSettings: Settings = {
          information: {
            name,
            icon: filename,
            branch,
          },
          weather: settings.weather,
          militaryDiscipline: settings.militaryDiscipline,
          chartDesign: settings.chartDesign,
        };
        setSettings(newSettings);
        addSetting.mutate(newSettings);
        history.push('/');
      });
    }
  };

  const handleFileOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const reader = new FileReader();
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    reader.onloadend = () => {
      setData({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div id="init">
      <div id="initComponent">
        <div id="logo">
          <img src="./icons/loca_icon.svg" alt="" />
        </div>
        <div id="initContainer">
          <form id="init_form" onSubmit={handleSubmit(initialize)}>
            <label
              htmlFor="profile-img"
              style={{
                backgroundImage: 'url(' + data.previewURL + ')',
              }}
              className="unitIcon"></label>
            <input
              type="file"
              id="profile-img"
              style={{
                display: 'none',
              }}
              onChange={handleFileOnChange}
              accept="image/jpg,image/png,image/jpeg,image/gif"
              name="profile_img"
            />
            <div>
              <p className="initHeader">소속</p>
              <select id="" className="initBelong" {...register('belong')}>
                <option value="국방부/국직">국방부/국직</option>
                <option value="육군">육군</option>
                <option value="해군">해군</option>
                <option value="공군">공군</option>
              </select>
            </div>
            <div>
              <p className="initHeader">부대명</p>
              <input
                type="search"
                className="initUnitName"
                {...register('name')}
              />
            </div>
            <div className="initSubmitContainer">
              <input type="submit" className="initSubmit" value="완료" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Init;
