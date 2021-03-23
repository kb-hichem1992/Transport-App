import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { SecondaryListItems } from "./listItems";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LaptopChromebookIcon from "@material-ui/icons/LaptopChromebook";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DirectionsIcon from "@material-ui/icons/Directions";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Collapse from "@material-ui/core/Collapse";
import SubdirectoryArrowRightOutlinedIcon from "@material-ui/icons/SubdirectoryArrowRightOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AppOp from "./Tables/AppOp.js";
import AppFor from "./Table_Formation/AppFor.js";
import AppCand from "./Table_Candidat/AppCand.js";
import AppVeh from "./Table_vehicule//AppVeh.js";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Welcome from "./welcome";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useAuth0 } from "@auth0/auth0-react";
import ListSubheader from "@material-ui/core/ListSubheader";
import InfoIcon from "@material-ui/icons/Info";
import GroupIcon from "@material-ui/icons/Group";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Dashboard() {
  const { logout } = useAuth0();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSide, setOpenSide] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpenSide(!openSide);
  };
  return (
    // the Appbar Starts from here
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="primary"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Centre de Formation
            </Typography>
            <Button color="inherit" onClick={() => logout()}>
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
        {/* the side bar starts from here */}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Acceuil" />
              </ListItem>
            </Link>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Operateurs" />
              {openSide ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={!openSide} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/op/mor" className={classes.link}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <SubdirectoryArrowRightOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText secondary="Personne Morale" />
                  </ListItem>
                </Link>
                <Link to="/op/phy" className={classes.link}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <SubdirectoryArrowRightOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText secondary="Personne physique" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <Link to="/For" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <DirectionsIcon />
                </ListItemIcon>
                <ListItemText primary="Formations" />
              </ListItem>
            </Link>
            <Link to="/candidat" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <PhotoCameraIcon />
                </ListItemIcon>
                <ListItemText primary="Candidats" />
              </ListItem>
            </Link>
            <Link to="/Vehicule" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <LaptopChromebookIcon />
                </ListItemIcon>
                <ListItemText primary="Véhicules" />
              </ListItem>
            </Link>
          </List>

          <Divider />
          <List>
            <ListSubheader inset> Configuration </ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Utilisateurs" />
            </ListItem>
            <Link to="/About" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="A propos" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
              <Switch>
                <Route path="/" component={Welcome} exact />
                <Route path="/op/mor">
                  <AppOp
                    id={"http://localhost:3001/api/get_op/mor"}
                    Title={"Liste des opérateurs/Personne Morale"}
                  />
                </Route>
                <Route
                  path="/op/phy"
                  render={(props) => (
                    <AppOp
                      {...props}
                      id={"http://localhost:3001/api/get_op/phy"}
                      Title={"Liste des opérateurs/Personne Physique"}
                    />
                  )}
                />
                <Route
                  path="/For"
                  render={(props) => (
                    <AppFor
                      {...props}
                      id={"http://localhost:3001/api/get_form"}
                    />
                  )}
                />
                <Route
                  path="/candidat"
                  render={(props) => (
                    <AppCand
                      {...props}
                      id={"http://localhost:3001/api/get_candidat_form"}
                    />
                  )}
                />
                <Route
                  path="/Vehicule"
                  render={(props) => (
                    <AppVeh
                      {...props}
                      id={"http://localhost:3001/api/get_veh_Mar"}
                      id2={"http://localhost:3001/api/get_veh_voyag"}
                    />
                  )}
                />
              </Switch>
            </Grid>
          </Container>
        </main>
      </div>
    </Router>
  );
}
