import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import Background from "./addPhoto.svg";
import "./Init.css";

type initData = {
  icon: string;
  belong: string;
  name: string;
};

const Init = () => {
  const { register, handleSubmit } = useForm();
  const [ data, setData ] = useState<{file: File|null, previewURL: string | ArrayBuffer | null}>({
    file: null,
    previewURL: './icons/addPhoto.svg'
  })

  const initialize = async ({ icon, belong, name }: initData) => {
    
  };

  const handleFileOnChange = (event : ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const reader = new FileReader();
    if (!event.target.files) {
      return ;
    }
    const file = event.target.files[0];
    reader.onloadend = () => {
      setData({
        file : file,
        previewURL : reader.result
      })
    }
    reader.readAsDataURL(file);
  }

  return (
    <div id="init">
      <div id="initComponent">
        <div id="logo">
          <img src="./icons/logo.svg" alt="" />
        </div>
        <div id="initContainer">
          <form id="init_form" onSubmit={handleSubmit(initialize)}>
            <label htmlFor="profile-img" style={{
              backgroundImage: 'url('+data.previewURL+')'
            }} className="unitIcon"></label>
            <input 
              type="file"
              id="profile-img"
              style={{
                display: 'none'
              }}
              onChange={handleFileOnChange}
              accept='image/jpg,impge/png,image/jpeg,image/gif' name='profile_img' />
              <div>
                <p className="initHeader">소속</p>
                <select name="" id="" className="initBelong">
                  <option value="국방부/국직">국방부/국직</option>
                  <option value="육군">육군</option>
                  <option value="해군">해군</option>
                  <option value="공군">공군</option>
                </select>
              </div>
              <div>
                <p className="initHeader">부대명</p>
                <input type="search" className="initUnitName"/>
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