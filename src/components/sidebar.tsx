import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"text"} disablePadding component={Link} to="/shop">
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Shop"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"text"} disablePadding component={Link} to="/liveEvents">
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Live Events"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"text"}
          disablePadding
          component={Link}
          to="/hourlyBonus"
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Hourly Bonus"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"text"} disablePadding component={Link} to="/miniGame">
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Mini Game"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"text"} disablePadding component={Link} to="/mlm">
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Mega Lucky Machines"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"text"} disablePadding component={Link} to="/videoAds">
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Video Ads"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            GSCP
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
