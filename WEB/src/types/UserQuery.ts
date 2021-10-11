interface UserQuery {
    serial?: string;
    name?: string;
    rank?: string;
    email?: string;
    phone?: string;
    rangeEnd?: Date;
    page?: number;
    limit?: number;
    active?: boolean;
  }
  
  export default UserQuery;
  