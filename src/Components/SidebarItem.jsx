import { NavLink } from "react-router-dom";

const SidebarItem = ({ label, to, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default SidebarItem;