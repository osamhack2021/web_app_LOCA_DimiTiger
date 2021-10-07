interface Register {
  identity: {
    serial: string;
    name: string;
    password: string;
  };
  register: {
    phone: string;
    email: string;
    password: string;
  };
}

export default Register;
