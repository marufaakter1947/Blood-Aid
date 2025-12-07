// import { useState } from 'react'
// import { Link } from 'react-router'
// import useAuth from '../../../hooks/useAuth'
// import logo from '../../../assets/images/Blood aid.png'

// // Icons
// import { GrLogout } from 'react-icons/gr'
// import { FcSettings } from 'react-icons/fc'
// import { AiOutlineBars } from 'react-icons/ai'
// import { MdDashboard } from 'react-icons/md'

// // Role Menus
// import DonorMenu from './Menu/DonorMenu'
// import VolunteerMenu from './Menu/VolunteerMenu'
// import AdminMenu from './Menu/AdminMenu'
// import MenuItem from './Menu/MenuItem'

// const Sidebar = () => {
//   const { logOut, user } = useAuth()
//   const [isActive, setActive] = useState(false)

//   const handleToggle = () => {
//     setActive(!isActive)
//   }

//   return (
//     <>
//       {/* Mobile Navbar */}
//       <div className='bg-gray-100 flex justify-between md:hidden'>
//         <Link to='/' className='p-4'>
//           <img src={logo} alt='logo' width='90' />
//         </Link>

//         <button
//           onClick={handleToggle}
//           className='p-4 focus:outline-none'
//         >
//           <AiOutlineBars className='h-6 w-6' />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`z-50 md:fixed flex flex-col justify-between bg-gray-100 w-64 px-3 py-4 absolute inset-y-0 left-0 transform ${
//           isActive ? '-translate-x-full' : 'translate-x-0'
//         } md:translate-x-0 transition duration-200`}
//       >
//         {/* Top */}
//         <div>
//            <Link to="/" className="flex items-center gap-1">
//                         <img src={logo} alt="logo" width="30" />
//                         <span className="hidden text-2xl md:block font-bold text-red-600">BloodAid</span>
//                       </Link>

//           <nav className='mt-6 space-y-1'>
//             {/* Common Dashboard */}
//             <MenuItem
//               icon={MdDashboard}
//               label='Dashboard'
//               address='/dashboard'
//             />

//             {/* Role Based Menus */}
//             {user?.role === 'donor' && <DonorMenu />}
//             {user?.role === 'volunteer' && <VolunteerMenu />}
//             {user?.role === 'admin' && <AdminMenu />}
//           </nav>
//         </div>

//         {/* Bottom */}
//         <div>
//           <hr className='my-3' />

//           <MenuItem
//             icon={FcSettings}
//             label='Profile'
//             address='/dashboard/profile'
//           />

//           <button
//             onClick={logOut}
//             className='flex items-center w-full px-4 py-2 mt-3 text-gray-600 hover:bg-gray-300 rounded-md'
//           >
//             <GrLogout className='w-5 h-5' />
//             <span className='ml-4'>Logout</span>
//           </button>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Sidebar
import { useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import logo from '../../../assets/images/Blood aid.png';

// Icons
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { AiOutlineBars } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';

// Role Menus
import DonorMenu from './Menu/DonorMenu';
import VolunteerMenu from './Menu/VolunteerMenu';
import AdminMenu from './Menu/AdminMenu';
import MenuItem from './Menu/MenuItem';

const Sidebar = () => {
  const { logOut, loading } = useAuth();
  const role = useRole();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => setActive(!isActive);

  // If auth state is loading, show nothing or loader
  if (loading) return null;

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-gray-100 flex justify-between md:hidden">
        <Link to="/" className="p-4">
          <img src={logo} alt="logo" width="90" />
        </Link>

        <button onClick={handleToggle} className="p-4 focus:outline-none">
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-50 md:fixed flex flex-col justify-between bg-gray-100 w-64 px-3 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? '-translate-x-full' : 'translate-x-0'
        } md:translate-x-0 transition duration-200`}
      >
        {/* Top */}
        <div>
          <Link to="/" className="flex items-center gap-1 mb-6">
            <img src={logo} alt="logo" width="30" />
            <span className="hidden text-2xl md:block font-bold text-red-600">
              BloodAid
            </span>
          </Link>

          <nav className="mt-6 space-y-1">
            {/* Common Dashboard */}
            <MenuItem icon={MdDashboard} label="Dashboard" address="/dashboard" />

            {/* Role Based Menus */}
            {role === 'donor' && <DonorMenu />}
            {role === 'volunteer' && <VolunteerMenu />}
            {role === 'admin' && <AdminMenu />}
          </nav>
        </div>

        {/* Bottom */}
        <div>
          <hr className="my-3" />

          <MenuItem icon={FcSettings} label="Profile" address="/dashboard/profile" />

          <button
            onClick={logOut}
            className="flex items-center w-full px-4 py-2 mt-3 text-gray-600 hover:bg-gray-300 rounded-md"
          >
            <GrLogout className="w-5 h-5" />
            <span className="ml-4">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
