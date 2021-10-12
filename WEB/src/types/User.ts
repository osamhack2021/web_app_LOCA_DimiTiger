interface User {
  _id: string;
  serial: string;
  name: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  rank: string;
  registered: boolean;
}

export default User;
