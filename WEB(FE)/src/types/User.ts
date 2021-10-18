interface User {
  _id: string;
  serial: string;
  name: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  rank: string;
  password?: string;
  registered: boolean;
}

export default User;
