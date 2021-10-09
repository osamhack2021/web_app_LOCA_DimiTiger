import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { addSeconds } from "date-fns";
import { useSetRecoilState } from "recoil";

import "./Login.css";

import { authWithIdPassword } from "../../api/auth";
import { queryClient } from "../../App";
import { authState } from "../../atoms";

type LoginData = {
  serial: string;
  password: string;
};

const Login = () => {
  const [, setCookie] = useCookies(["access_token", "refresh_token"]);
  const setAuthState = useSetRecoilState(authState);
  const { register, handleSubmit } = useForm();

  const signIn = async ({ serial, password }: LoginData) => {
    const { access_token, refresh_token, expires_in } =
      await authWithIdPassword(serial, password);
    setCookie("access_token", access_token, {
      expires: addSeconds(new Date(), expires_in),
    });
    setCookie("refresh_token", refresh_token, {
      expires: addSeconds(new Date(), expires_in),
    });
    setAuthState({
      authenticated: true,
      loading: false,
    });
    queryClient.invalidateQueries(["users", "me"]);
  };

  return (
    <div id="login">
      <div id="loginComponent">
        <div id="logo">
          <img src="./icons/logo.svg" alt="" />
        </div>
        <div id="loginContainer">
          <form id="login_form" onSubmit={handleSubmit(signIn)}>
            <div className="caption">관리자 아이디</div>
            <input
              type="text"
              id="manager_id"
              placeholder={"00-000000"}
              {...register("serial")}
            />
            <div className="caption">비밀번호</div>
            <input type="password" id="manager_pw" {...register("password")} />
            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
/*https://www.daleseo.com/react-router-authentication/*/
