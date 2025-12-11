import { NavLink } from 'react-router';

const MenuItem = ({ icon: Icon, label, address }) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2 text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-800 transition-colors ${
          isActive ? 'bg-red-200 text-red-900 font-semibold' : ''
        }`
      }
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
