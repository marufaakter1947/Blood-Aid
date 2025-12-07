import { NavLink } from 'react-router';

const MenuItem = ({ icon: Icon, label, address }) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2 text-gray-700 rounded-lg hover:bg-lime-100 hover:text-lime-800 transition-colors ${
          isActive ? 'bg-lime-200 text-lime-900 font-semibold' : ''
        }`
      }
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
