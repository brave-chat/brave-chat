import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import "../style.css";
import SidebarHeader from "./SidebarHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContactList from "./ContactList";
import ChatUserList from "./ChatUserList";

const Sidebar = () => {
  const [value, setValue] = useState(1);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const onContactSelect = (contact) => {
    dispatch(onUserSelect(contact));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 1) {
      // TODO: dispatch get chat event
    } else {
      // TODO: dispatch get contact event
    }
  }, [dispatch, searchText, value]);

  return (
    <Box className="in-build-app-sidebar">
      <SidebarHeader
        user={thisCurrentUser}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Tabs
        className="tab-container"
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab className="tab-root" label="Chat" value={1} />
        <Tab className="tab-root" label="Contact" value={2} />
      </Tabs>
    </Box>
  );
};

export default Sidebar;
