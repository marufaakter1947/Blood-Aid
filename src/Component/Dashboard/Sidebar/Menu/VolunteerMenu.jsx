import { FaTint } from 'react-icons/fa'
import MenuItem from './MenuItem'

const VolunteerMenu = () => {
  return (
    <MenuItem
      icon={FaTint}
      label='All Blood Requests'
      address='/dashboard/all-blood-donation-request'
    />
  )
}

export default VolunteerMenu
