import { FaPlusCircle, FaTint } from 'react-icons/fa'
import MenuItem from './MenuItem'

const DonorMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaPlusCircle}
        label='Create Donation Request'
        address='/dashboard/create-donation-request'
      />

      <MenuItem
        icon={FaTint}
        label='My Donation Requests'
        address='/dashboard/my-donation-requests'
      />
    </>
  )
}

export default DonorMenu
