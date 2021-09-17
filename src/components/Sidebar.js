import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faBox,
  faBoxOpen,
  faChevronRight,
  faCube,
  faFileArchive,
  faHome,
  faPowerOff,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const useMultipleRef = () => {
  const refs = [];
  return [refs, (e) => e && refs.push(e)];
};

const Sidebar = ({ onShown = () => {} }) => {
  const [dropdownMenu, setDropdownMenu] = useMultipleRef();
  const [sidebarMenu] = useState(() => {
    if (localStorage.getItem("role") === "admin") {
      return [
        {
          name: "Dashboard",
          icon: <FontAwesomeIcon icon={faHome} />,
          href: "/",
          exact: true,
        },
        {
          name: "Data Pengguna",
          icon: <FontAwesomeIcon icon={faUser} />,
          href: "/pengguna",
        },
        {
          name: "Barang",
          icon: <FontAwesomeIcon icon={faCube} />,
          children: [
            { name: "Data Barang", href: "/barang" },
            { name: "Kategori Barang", href: "/kategori" },
            { name: "Satuan Barang", href: "/satuan" },
          ],
        },
        {
          name: "Supplier",
          icon: <FontAwesomeIcon icon={faTruck} />,
          href: "/supplier",
        },
        {
          name: "Barang Masuk",
          icon: <FontAwesomeIcon icon={faBox} />,
          href: "/barang_masuk",
        },
        {
          name: "Barang Keluar",
          icon: <FontAwesomeIcon icon={faBoxOpen} />,
          href: "/barang_keluar",
        },
        {
          name: "Laporan",
          icon: <FontAwesomeIcon icon={faFileArchive} />,
          href: "/laporan",
        },
        {
          name: "Logout",
          icon: <FontAwesomeIcon icon={faPowerOff} />,
          href: "/logout",
        },
      ];
    } else {
      return [
        {
          name: "Dashboard",
          icon: <FontAwesomeIcon icon={faHome} />,
          href: "/",
          exact: true,
        },
        {
          name: "Barang",
          icon: <FontAwesomeIcon icon={faCube} />,
          children: [
            { name: "Data Barang", href: "/barang" },
            { name: "Kategori Barang", href: "/kategori" },
            { name: "Satuan Barang", href: "/satuan" },
          ],
        },
        {
          name: "Supplier",
          icon: <FontAwesomeIcon icon={faTruck} />,
          href: "/supplier",
        },
        {
          name: "Barang Masuk",
          icon: <FontAwesomeIcon icon={faBox} />,
          href: "/barang_masuk",
        },
        {
          name: "Barang Keluar",
          icon: <FontAwesomeIcon icon={faBoxOpen} />,
          href: "/barang_keluar",
        },
        {
          name: "Laporan",
          icon: <FontAwesomeIcon icon={faFileAlt} />,
          href: "/laporan",
        },
        {
          name: "Logout",
          icon: <FontAwesomeIcon icon={faPowerOff} />,
          href: "/logout",
        },
      ];
    }
  });

  const handleToggleDropdown = (e) => {
    const icon = e.currentTarget.lastElementChild;
    const collapse = e.currentTarget.nextElementSibling;
    const dropdownMenu = collapse.lastElementChild;
    if (collapse.clientHeight > 0) {
      icon.classList.remove("rotate-90");
      collapse.style.height = 0;
    } else {
      icon.classList.add("rotate-90");
      collapse.style.height = dropdownMenu.clientHeight + "px";
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      onShown(false);
    } else {
      onShown(true);
    }
  }, []);

  useEffect(() => {
    dropdownMenu.forEach((e, index) => {
      const collapse = e.parentElement;
      const button = collapse.previousElementSibling;
      const icon = button.lastElementChild;
      const active = e.getElementsByClassName("active");

      // open collapse active
      if (active.length > 0) {
        icon.classList.add("rotate-90");
        collapse.style.height = e.clientHeight + "px";
      } else {
        icon.classList.remove("rotate-90");
        collapse.style.height = 0;
      }
    });
  }, [dropdownMenu]);

  return (
    <>
      <div className="font-montserrat overflow-y-auto px-2">
        <div className="font-bold text-white text-xl text-center">
          INVENTORY
        </div>
        <div className="border-b w-4/5 mx-auto my-4"></div>
        <div className="text-sm py-4">
          <ul className="flex flex-col text-gray-200 space-y-2">
            {sidebarMenu.map((value, index) => {
              if (!value.children) {
                return (
                  <li key={index}>
                    <NavLink
                      exact={value.exact}
                      activeClassName="active bg-gray-100 text-gray-600 shadow-xl"
                      to={value.href}
                      className="flex items-center hover:backdrop-filter hover:backdrop-brightness-125 rounded space-x-2 px-2.5 py-1.5">
                      <div className="backdrop-filter backdrop-brightness-125 text-center rounded w-8 px-1.5 py-1">
                        {value.icon}
                      </div>
                      <span>{value.name}</span>
                    </NavLink>
                  </li>
                );
              } else {
                return (
                  <li key={index}>
                    <button
                      className={`flex items-center justify-between hover:bg-gray-500 rounded w-full px-2.5 py-1.5`}
                      onClick={handleToggleDropdown}>
                      <div className="flex items-center space-x-2">
                        <div className="backdrop-filter backdrop-brightness-125 text-center rounded w-8 px-1.5 py-1">
                          {value.icon}
                        </div>
                        <span>{value.name}</span>
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="transition-transform duration-300 transform"
                      />
                    </button>
                    <div
                      className="overflow-hidden"
                      style={{
                        height: 0,
                        transition: "height .5s ease-in-out",
                      }}>
                      <ul
                        ref={setDropdownMenu}
                        className="dropdown-menu flex flex-col font-poppins text-gray-200 space-y-2 p-2">
                        {value.children.map((value, index) => {
                          return (
                            <li key={index}>
                              <NavLink
                                exact={value.exact}
                                activeClassName="active bg-gray-100 text-gray-600 shadow-xl"
                                to={value.href}
                                className="block rounded px-2.5 py-1.5">
                                {value.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
