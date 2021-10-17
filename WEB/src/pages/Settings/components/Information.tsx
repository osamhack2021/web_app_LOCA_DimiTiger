import { ChangeEvent, useState } from 'react';
import { Button, Form } from 'antd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { useAddSetting } from '@/api/settings';
import { settingsState } from '@/atoms';
import useAxios from '@/hooks/useAxios';
import Settings from '@/types/Settings';

const Information = () => {
  const [form] = Form.useForm();
  const [settings, setSettings] = useRecoilState(settingsState);
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
        onFinish={({ unitName }) => {
          const formData = new FormData();
          if (data.file != null) {
            formData.append('file', data.file);
            fileUploader(formData).then((filename: string) => {
              const tempSetting: Settings = {
                information: {
                  name: unitName,
                  icon: filename,
                  branch: settings.information.branch,
                },
                weather: settings.weather,
                militaryDiscipline: settings.militaryDiscipline,
                chartDesign: settings.chartDesign,
              };
              setSettings(tempSetting);
              addSetting.mutate(settings);
            });
          }
        }}>
        <Label>부대명</Label>
        <Form.Item name="unitName" initialValue={settings.information.name}>
          <Input />
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
          accept="image/jpg,image/png,image/jpeg,image/gif"
          name="profile_img"
        />
        <Button type="primary" htmlType="submit">
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
export default Information;
