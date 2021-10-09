import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { addSeconds } from 'date-fns';
import { useSetRecoilState } from 'recoil';

import './Login.css';

import { authWithIdPassword } from '../../api/auth';
import { queryClient } from '../../App';
import { authState } from '../../atoms';

type LoginData = {
  serial: string;
  password: string;
};

const Login = () => {
  const [, setCookie] = useCookies(['access_token', 'refresh_token']);
  const setAuthState = useSetRecoilState(authState);
  const { register, handleSubmit } = useForm();

  const signIn = async ({ serial, password }: LoginData) => {
    const { access_token, refresh_token, expires_in } =
      await authWithIdPassword(serial, password);
    setCookie('access_token', access_token, {
      expires: addSeconds(new Date(), expires_in),
    });
    setCookie('refresh_token', refresh_token, {
      expires: addSeconds(new Date(), expires_in),
    });
    setAuthState({
      authenticated: true,
      loading: false,
    });
    queryClient.invalidateQueries(['users', 'me']);
  };

  return (
    <div id="login">
      <div id="loginComponent">
        <div id="logo">
          <svg
            width="300"
            height="150"
            viewBox="0 0 345 151"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M195.532 70.924V77.476H162.484V27.22H169.036V70.924H195.532Z"
              fill="#4C535E"
            />
            <path
              d="M204.4 33.7C208.96 28.9 215.032 26.5 222.616 26.5C230.2 26.5 236.272 28.9 240.832 33.7C245.392 38.5 247.744 44.716 247.888 52.348C247.744 59.98 245.392 66.196 240.832 70.996C236.272 75.796 230.2 78.196 222.616 78.196C215.032 78.196 208.96 75.796 204.4 70.996C199.84 66.196 197.488 59.98 197.344 52.348C197.488 44.716 199.84 38.5 204.4 33.7ZM203.896 52.348C203.896 58.06 205.552 62.788 208.864 66.532C212.224 70.228 216.784 72.076 222.544 72.076C228.352 72.076 232.936 70.228 236.296 66.532C239.656 62.788 241.336 58.06 241.336 52.348C241.336 46.636 239.656 41.932 236.296 38.236C232.936 34.492 228.352 32.62 222.544 32.62C216.784 32.62 212.224 34.492 208.864 38.236C205.552 41.932 203.896 46.636 203.896 52.348Z"
              fill="#4C535E"
            />
            <path
              d="M294.08 37.66C289.136 34.396 283.688 32.764 277.736 32.764C271.784 32.764 267.128 34.588 263.768 38.236C260.408 41.884 258.728 46.588 258.728 52.348C258.728 58.108 260.408 62.812 263.768 66.46C267.128 70.108 271.784 71.932 277.736 71.932C283.688 71.932 289.136 70.3 294.08 67.036H294.44V73.516C289.256 76.636 283.568 78.196 277.376 78.196C270.032 78.196 263.984 75.868 259.232 71.212C254.528 66.508 252.176 60.22 252.176 52.348C252.176 44.476 254.528 38.212 259.232 33.556C263.984 28.852 270.032 26.5 277.376 26.5C283.568 26.5 289.256 28.06 294.44 31.18V37.66H294.08Z"
              fill="#4C535E"
            />
            <path
              d="M337.513 77.476L332.113 64.588H307.705L302.305 77.476H295.177L316.489 27.22H323.329L344.641 77.476H337.513ZM310.297 58.252V58.612H329.521V58.252L320.017 35.284H319.873L310.297 58.252Z"
              fill="#4C535E"
            />
            <path
              d="M170.826 91.348C173.466 91.348 175.16 92.14 175.16 93.57C175.16 95.022 173.466 95.792 170.826 95.792C168.164 95.792 166.47 95.022 166.47 93.57C166.47 92.14 168.164 91.348 170.826 91.348ZM170.826 98.102C175.138 98.102 178.152 96.342 178.152 93.57C178.152 90.82 175.138 89.038 170.826 89.038C166.492 89.038 163.5 90.82 163.5 93.57C163.5 96.342 166.492 98.102 170.826 98.102ZM180.044 99.62H161.696V101.974H165.854V108.596H168.78V101.974H172.85V108.596H175.798V101.974H180.044V99.62Z"
              fill="#9B9DA2"
            />
            <path
              d="M194.342 106.44C191.636 106.44 190.25 105.978 190.25 104.922C190.25 103.866 191.636 103.382 194.342 103.382C197.048 103.382 198.434 103.866 198.434 104.922C198.434 105.978 197.048 106.44 194.342 106.44ZM194.342 101.182C189.964 101.182 187.324 102.524 187.324 104.922C187.324 107.298 189.964 108.64 194.342 108.64C198.72 108.64 201.382 107.298 201.382 104.922C201.382 102.524 198.72 101.182 194.342 101.182ZM195.86 97.882V96.21H201.492V93.9H190.36V91.524H201.382V89.214H187.478V96.21H192.956V97.882H185.256V100.192H203.582V97.882H195.86Z"
              fill="#9B9DA2"
            />
            <path
              d="M222.809 93.614V95.462H219.201V93.614H222.809ZM216.363 97.024H212.513V94.516H216.363V97.024ZM219.201 97.772H222.809V100.456H225.713V88.356H222.809V91.304H219.201V89.566H216.363V92.294H212.513V89.588H209.631V99.334H219.201V97.772ZM218.849 106.418C216.209 106.418 214.823 105.868 214.823 104.724C214.823 103.58 216.209 103.03 218.849 103.03C221.511 103.03 222.897 103.58 222.897 104.724C222.897 105.868 221.511 106.418 218.849 106.418ZM218.849 100.83C214.559 100.83 211.919 102.26 211.919 104.724C211.919 107.188 214.559 108.618 218.849 108.618C223.161 108.618 225.801 107.188 225.801 104.724C225.801 102.26 223.161 100.83 218.849 100.83Z"
              fill="#9B9DA2"
            />
            <path
              d="M242.651 97.53C240.649 97.904 238.867 97.992 235.963 98.014V95.902H241.925V89.5H233.059V91.832H239.065V93.746H233.081V100.346H234.643C238.493 100.346 240.583 100.28 242.937 99.84L242.651 97.53ZM235.391 104.064H246.347V108.64H249.251V101.754H235.391V104.064ZM246.347 88.378V91.15H243.091V93.482H246.347V95.484H243.091V97.794H246.347V100.852H249.251V88.356L246.347 88.378Z"
              fill="#9B9DA2"
            />
            <path
              d="M266.673 97.046C267.135 94.494 267.135 92.492 267.135 91.084V89.83H256.729V92.14H264.275C264.253 93.35 264.165 94.824 263.835 96.716L266.673 97.046ZM268.015 97.86C266.123 98.124 264.099 98.278 262.097 98.366V94.538H259.259V98.476C257.939 98.498 256.685 98.498 255.563 98.498L255.827 100.808C259.303 100.786 264.011 100.698 268.191 99.928L268.015 97.86ZM261.415 102.172H258.511V108.266H272.657V105.956H261.415V102.172ZM272.019 94.516V88.334H269.115V103.514H272.019V96.914H274.439V94.516H272.019Z"
              fill="#9B9DA2"
            />
            <path
              d="M283.435 97.904H290.013V90.072H280.443V92.382H287.043V95.616H280.465V103.954H282.291C285.965 103.954 288.935 103.822 292.235 103.25L291.927 100.896C289.067 101.38 286.515 101.534 283.435 101.556V97.904ZM293.335 88.334V108.662H296.239V88.334H293.335Z"
              fill="#9B9DA2"
            />
            <path
              d="M309.218 94.076H312.32V91.744H309.218V89.016H306.468V91.744H303.3V94.076H306.468V94.494C306.468 97.618 305.434 100.94 302.552 102.634L304.18 104.812C306.006 103.756 307.194 101.952 307.876 99.84C308.602 101.776 309.768 103.382 311.55 104.328L313.112 102.172C310.252 100.654 309.218 97.552 309.218 94.494V94.076ZM313.464 96.012H311.154V98.366H313.464V107.694H316.17V88.686H313.464V96.012ZM317.556 88.334V108.596H320.306V88.334H317.556Z"
              fill="#9B9DA2"
            />
            <path
              d="M336.98 93.702H335.022C335.132 92.756 335.198 91.788 335.198 90.754H327.322V93.064H332.316C331.942 97.024 330.182 99.95 326.178 102.392L327.828 104.416C331.612 102.172 333.636 99.356 334.538 96.012H336.98V98.762H334.164V101.094H336.98V107.738H339.686V88.796H336.98V93.702ZM341.138 88.334V108.618H343.888V88.334H341.138Z"
              fill="#9B9DA2"
            />
            <path
              d="M0 62.5C0 18 18 0 62.5 0H65.5C110 0 128 18 128 62.5V65.5C128 110 110 128 65.5 128H62.5C18 128 0 110 0 65.5V62.5Z"
              fill="#C4C4C4"
            />
            <path
              d="M0 62.5C0 18 18 0 62.5 0H65.5C110 0 128 18 128 62.5V65.5C128 110 110 128 65.5 128H62.5C18 128 0 110 0 65.5V62.5Z"
              fill="url(#paint0_linear)"
            />
            <g filter="url(#filter0_d)">
              <path
                d="M47.9887 82.3388C51.8182 87.1938 56.5877 93.5365 62.1342 101.534C62.5537 102.138 63.2432 102.5 63.981 102.5C64.7187 102.5 65.4082 102.138 65.8277 101.534C71.3195 93.6178 76.0667 87.2948 79.8832 82.4553C88.4777 71.553 93.212 65.5472 93.212 54.981C93.212 38.8635 80.0985 25.75 63.981 25.75C47.8635 25.75 34.75 38.8635 34.75 54.981C34.75 65.5583 39.4513 71.52 47.9887 82.3388ZM63.981 39.2412C72.659 39.2412 79.7207 46.303 79.7207 54.981C79.7207 63.659 72.659 70.7207 63.981 70.7207C55.303 70.7207 48.2412 63.659 48.2412 54.981C48.2412 46.303 55.303 39.2412 63.981 39.2412Z"
                fill="white"
              />
              <path
                d="M47.9887 82.3388C51.8182 87.1938 56.5877 93.5365 62.1342 101.534C62.5537 102.138 63.2432 102.5 63.981 102.5C64.7187 102.5 65.4082 102.138 65.8277 101.534C71.3195 93.6178 76.0667 87.2948 79.8832 82.4553C88.4777 71.553 93.212 65.5472 93.212 54.981C93.212 38.8635 80.0985 25.75 63.981 25.75C47.8635 25.75 34.75 38.8635 34.75 54.981C34.75 65.5583 39.4513 71.52 47.9887 82.3388ZM63.981 39.2412C72.659 39.2412 79.7207 46.303 79.7207 54.981C79.7207 63.659 72.659 70.7207 63.981 70.7207C55.303 70.7207 48.2412 63.659 48.2412 54.981C48.2412 46.303 55.303 39.2412 63.981 39.2412Z"
                fill="url(#paint1_linear)"
              />
            </g>
            <defs>
              <filter
                id="filter0_d"
                x="2.75"
                y="9.75"
                width="122.462"
                height="140.75"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="16" />
                <feGaussianBlur stdDeviation="16" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear"
                x1="64"
                y1="0"
                x2="64"
                y2="128"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="#56CCF2" />
                <stop offset="1" stopColor="#2F80ED" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="63.981"
                y1="25.75"
                x2="63.981"
                y2="102.5"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#C0F4FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div id="loginContainer">
          <form id="login_form" onSubmit={handleSubmit(signIn)}>
            <div className="caption">관리자 아이디</div>
            <input
              type="text"
              id="manager_id"
              placeholder={'00-000000'}
              {...register('serial')}
            />
            <div className="caption">비밀번호</div>
            <input type="password" id="manager_pw" {...register('password')} />
            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
/*https://www.daleseo.com/react-router-authentication/*/
