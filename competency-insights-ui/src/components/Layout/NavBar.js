import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Header } from "./Header";
import { Link } from "react-router-dom";
const drawerWidth = 200;
export const PermanentDrawerLeft= ({name}) => {
  const sidebarItems = [
    { text: "Profile", link: "/profile", icon: <PersonIcon /> },
    { text: "OKR's", link: "/addokr", icon: <CheckCircleOutlineIcon /> },
    { text: "Inbox", link: "#", icon: <InboxIcon /> },
    { text: "Teams", link: "/team", icon: <PeopleIcon /> }
  ];

  if (name === "Sushant Gupta" || name === "Ankit Mogha") {
    sidebarItems.push({ text: "Competency", link: "/studio", icon: <AssessmentIcon /> });
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            height: "0px",
            display: 'flex', 
        }}
        >
      <Header name = {name}/>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ padding: '1px' }}>
        <img src="/nashtech_logo.png" alt="Logo" style={{ width: '200px', height: 'auto' }}/>
        </Toolbar>
        <Divider />
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              component={Link}
              to={item.link}
            >
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
