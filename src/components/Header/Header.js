import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logout from '../../actions/logout';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


export default function Header(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const [navs] = useState([
    {
      name: "pipeline List",
      path: "/"
    },
    {
      name: 'configuration',
      path:'/configuration'
    }
  ]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {navs.map((page, index) => (
          <ListItem button key={page.name}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <Link to={page.path}>{page.name}</Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div style={{ backgroundColor: 'rgb(209 201 201)', height: 50, marginBottom: 30}}>
      <Container maxWidth="lg" style={{height: 50}}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {props.isAuth &&
             <Button onClick={toggleDrawer(anchor, true)} style={{margin: 'auto'}}>Menu</Button>
          }
        
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
          {props.isAuth &&
                <Button onClick={() => {logout()}} style={{margin: 'auto'}}>LogOut</Button>

          }
        </React.Fragment>
        
      ))}
      </Container>
    </div>
  );
}