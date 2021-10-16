import { ChangeEvent, useState } from 'react';
import { Button, Form } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { useAddSetting } from '../../../api/settings';
import { settingState } from '../../../atoms';
import useAxios from '../../../hooks/useAxios';
import Setting from '../../../types/Setting';

const Defaults = () => {
  const [form] = Form.useForm();
  const setSetting = useSetRecoilState(settingState);
  const [settings] = useRecoilState(settingState);
  const [data, setData] = useState<{
    file: File | null;
    previewURL: string | ArrayBuffer | null;
  }>({
    file: null,
    previewURL: './icons/addPhoto.svg',
  });

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

  const axios = useAxios();
  const fileUploader = async (formData: FormData) => {
    const { filename } = (await axios.post(`/files/upload`, formData)).data;
    return filename;
  };

  const addSetting = useAddSetting();

  return (
    <WrapperContent>
      <Form
        form={form}
        onFinish={({ name }) => {
          const formData = new FormData();
          if (data.file != null) {
            formData.append('file', data.file);
            fileUploader(formData).then((filename: string) => {
              const tempSetting: Setting = {
                defaults: {
                  name: name,
                  icon: filename,
                  belong: settings.defaults.belong,
                },
                weather: settings.weather,
                militaryDiscipline: settings.militaryDiscipline,
                chartDesign: settings.chartDesign,
              };
              setSetting(tempSetting);
              addSetting.mutate(settings);
            });
          }
        }}>
        <Label>부대명</Label>
        <Form.Item name="name">
          <Input placeholder={settings.defaults.name} />
        </Form.Item>
        <Label>아이콘</Label>
        <label
          htmlFor="profile-img"
          style={{
            backgroundImage: 'url(' + data.previewURL + ')',
            marginTop: '40px',
          }}
          className="unitIcon"></label>
        <input
          type="file"
          id="profile-img"
          style={{
            display: 'none',
          }}
          onChange={handleFileOnChange}
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          name="profile_img"
        />
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}>
          설정
        </Button>
      </Form>
    </WrapperContent>
  );
};
const Label = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 250px;
  height: 44px;
  padding: 0 10px;
  border: solid 2px #0085ff;
  border-radius: 13px;
  background-color: #f5f6fa;
  font-size: 1rem;
  margin-bottom: 40px;
  transition: border 0.5s ease;
  &:focus {
    outline: none;
    border: solid 2px #0008f5;
  }
`;
const WrapperContent = styled.div`
  padding: 40px;
`;
export default Defaults;
