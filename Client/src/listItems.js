import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import LaptopChromebookIcon from "@material-ui/icons/LaptopChromebook";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DirectionsIcon from "@material-ui/icons/Directions";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Collapse from "@material-ui/core/Collapse";
import SubdirectoryArrowRightOutlinedIcon from "@material-ui/icons/SubdirectoryArrowRightOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import { BrowserRouter as Link, Router } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const MainListItems = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Link to="/">
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
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/op/mor">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SubdirectoryArrowRightOutlinedIcon />
              </ListItemIcon>
              <ListItemText secondary="Personne Morale" />
            </ListItem>
          </Link>

          <ListItem
            button
            component="a"
            href="/op/phy"
            className={classes.nested}
          >
            <ListItemIcon>
              <SubdirectoryArrowRightOutlinedIcon />
            </ListItemIcon>
            <ListItemText secondary="Personne physique" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button component="a" href="/For">
        <ListItemIcon>
          <DirectionsIcon />
        </ListItemIcon>
        <ListItemText primary="Formations" />
      </ListItem>
      <ListItem button component="a" href="/candidat">
        <ListItemIcon>
          <PhotoCameraIcon />
        </ListItemIcon>
        <ListItemText primary="Candidats" />
      </ListItem>
      <ListItem button component="a" href="/Vehicule">
        <ListItemIcon>
          <LaptopChromebookIcon />
        </ListItemIcon>
        <ListItemText primary="Véhicules" />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = () => {
  return (
      <div>
        <ListSubheader inset> Configuration </ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Utilisateurs" />
        </ListItem>
        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="A propos" />
          </ListItem>
        </Link>
      </div>
  );
};
