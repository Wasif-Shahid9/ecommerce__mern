import React, { useEffect } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
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
import { Link, useNavigate } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";

import CreateProductAdmin from "./AdminCreateProduct";
// Collapse
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { adminProductAction } from "../../redux/reducersFun/adminProducts/adminProductsReducer";
import { adminAllOrdersAction } from "../../redux/reducersFun/adminOrders/adminAllOrders";
import { adminGetAllUsersAction } from "../../redux/reducersFun/adminUsers/adminAllUsers";

const drawerWidth = 240;

function Sidebar(props) {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.adminProductsReducer);
  const { orders } = useSelector((state) => state.adminAllOrders);
  const { users } = useSelector((state) => state.adminAllUsersReducer);

  useEffect(() => {
    dispatch(adminProductAction());
    dispatch(adminAllOrdersAction());
    dispatch(adminGetAllUsersAction());
  }, [dispatch]);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock <= 0) {
        outOfStock = outOfStock + 1;
      }
    });

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Dashboard", link: "/admin/dashboard" },
    // { text: "Products", link: "/admin/products" },
    { text: "Orders", link: "/admin/orders" },
    { text: "Users", link: "/admin/users" },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <Link to="/admin/products">
              <ListItemText primary="All Product" />
            </Link>
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <Link to="/admin/create">
              <ListItemText primary="Create Product" />
            </Link>
          </ListItemButton>
        </List>
        {/* <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <Link to="/admin/update">
              <ListItemText primary="Update Product" />
            </Link>
          </ListItemButton>
        </List> */}
      </Collapse>
      <Divider />
    </div>
  );

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineChartData = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const dognutChartData = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        // label: "My First Dataset",
        data: [outOfStock, products.length - outOfStock],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };
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
            Dashboard
          </Typography>
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
            keepMounted: true,
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
        <div>
          <h1 className="text-4xl text-center bg-black text-white py-4">
            Total Amount <br /> ${totalAmount}
          </h1>
        </div>

        <div className="flex mt-5">
          <Link
            to="/admin/products "
            className="border-l-neutral-900 bg-blue-900 p-7 text-white "
          >
            <p> Products </p>
            <p> {products && products.length} </p>
          </Link>
          <Link
            to="/admin/orders"
            className="border-l-neutral-900 bg-blue-900 p-7 text-white ms-5"
          >
            <p> Orders </p>
            <p>{orders && orders.length}</p>
          </Link>
          <Link
            to="/admin/users"
            className="border-l-neutral-900 bg-blue-900 p-7 text-white ms-5"
          >
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>
        </div>
        <div className="lineChart ">
          {/* <Line data={lineState} /> */}
          <Line data={lineChartData} />
        </div>
        <div className="dognut__Chart  w-[50%] h-[50%] border-l-neutral-900">
          <Doughnut data={dognutChartData} {...props} />
        </div>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Sidebar;
