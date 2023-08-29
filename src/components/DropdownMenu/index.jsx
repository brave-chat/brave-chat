import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Menu, MenuItem } from "@mui/material";

const DropdownMenu = ({ TriggerComponent, items, onItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setMenuItems(items);
  }, [items]);

  const openMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item, selectedIndex, event) => {
    event.stopPropagation();
    onItemClick(item);
    closeMenu(event);
  };
  return (
    <>
      <div className="pointer">
        {/* eslint-disable-next-line*/}
        <TriggerComponent.type {...TriggerComponent.props} onClick={openMenu} />
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {menuItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              disabled={item.disabled}
              onClick={(event) =>
                handleMenuItemClick({ ...item }, index, event)
              }
            >
              {item.icon}
              <div className="ml-2">{item.label}</div>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

DropdownMenu.propTypes = {
  items: PropTypes.array.isRequired,
  TriggerComponent: PropTypes.element.isRequired,
  onItemClick: PropTypes.func,
};

export default DropdownMenu;
