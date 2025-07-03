import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

const SidebarItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected === title}
      style={{
        color: selected === title ? colors.blueAccent[400] : colors.grey[1],
        backgroundColor: selected === title ? colors.primary[800] : "transparent",
        margin: "4px 0",
        borderRadius: "4px",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography variant="body1" fontWeight={selected === title ? "600" : "400"}>
        {title}
      </Typography>
    </MenuItem>
  );
};

const AppSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        "& .ps-menu-button": {
          padding: "5px 35px 5px 20px !important", 
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important", 
        },
        "& .ps-menu-button.ps-active": {
          color: "#6870fa !important", 
        },
        "& .ps-menu-icon": {
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar 
        collapsed={isCollapsed}
        width="250px"
        collapsedWidth="80px"
        rootStyles={{
          height: "100%",
          position: "sticky", //
          top: 0,
          borderRight: "none",
          boxShadow: "none",
        }}
      >
        <Menu 
          iconShape="square"
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: `${colors.primary[800]} !important`,
                color: `${colors.blueAccent[400]} !important`,
              },
              "&:hover": {
                backgroundColor: `${colors.primary[800]} !important`,
              },
            },
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "16px 0 24px 0",
              color: colors.grey[1],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[1]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{ color: colors.grey[1] }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[1]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Koushik
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Student
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[1]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Data"}
            </Typography>
            <SidebarItem
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Contacts"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Invoices"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[1]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Pages"}
            </Typography>
            <SidebarItem
              title="Profile"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="FAQ"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[1]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Charts"}
            </Typography>
            <SidebarItem
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Geography"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Predictions"
              to="/predict"
              icon={<SmartToyOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AppSidebar;