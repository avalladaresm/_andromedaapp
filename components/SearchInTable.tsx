import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../pages/users/utils'
import { GetSearchedUsers } from '../services/users';
import _ from 'lodash'
const { Search } = Input

export const SearchInTable = () => {
  const users = useSelector(state=>state.users.users)
  const dispatch = useDispatch();

  return(
    <div style={{ textAlign: 'right' }}>
      <Search
        placeholder='search users'
        enterButton
        onSearch={ value => dispatch(GetSearchedUsers({ data: searchUsers(users, value), status: searchUsers(users, value).length > 0 ? 'Found' : 'NotFound' })) }
      />
    </div>
  )
}