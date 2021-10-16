import { useState } from 'react';
import { Select, SelectProps, Spin } from 'antd';

import { useUsers } from '../api/users';

const UserSearchSelect = (props: SelectProps<string>) => {
  const [text, setText] = useState('');
  const { data: users, isFetching } = useUsers({
    name: text || undefined,
  });

  return (
    <Select
      showSearch
      showArrow={false}
      placeholder="사용자 선택"
      filterOption={false}
      onSearch={setText}
      notFoundContent={isFetching ? <Spin size="small" /> : null}
      style={{ width: 200 }}
      {...props}>
      {users?.map(({ name, rank, _id }) => (
        <Select.Option value={_id} key={_id}>{`${rank} ${name}`}</Select.Option>
      ))}
    </Select>
  );
};

export default UserSearchSelect;
