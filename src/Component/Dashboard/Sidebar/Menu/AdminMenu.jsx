import { FaUsers, FaTint } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUsers}
        label='All Users'
        address='/dashboard/all-users'
      />

      <MenuItem
        icon={FaTint}
        label='All Blood Requests'
        address='/dashboard/all-blood-donation-request'
      />
    </>
  )
}

export default AdminMenu
