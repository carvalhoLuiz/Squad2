import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import defineIcons from '../../utils/defineIcon'

import api from '../../service/api';

// Pages
import SquadUsuario from '../../pages/SquadUsuario/squadusuario';
import MinhasInformacoes from '../../pages/minhasInformacoes/minhasInformacoes';
import Squad from '../../pages/SquadCadastro/squad';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// profile
import './profile.css';
import ProfilePadrao from './Profile_id.png';

import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',        
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#303030",
        color: "#FE963D"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        background: "#303030",
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        color: "#FE963D",

    },
    drawerOpen: {
        background: "#303030",
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        background: "#303030",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end', 
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),       
    },
    sectionDesktop: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
    outlinedPrimary: {
        /* … */
        '&:hover': { background: "#7A57EA", color: "#fff !important" },
    },
    itemColor: {
        color: "#FE963D"
    },
    inboard: {
        color: "#7A57EA",
        fontSize: "30px",
        fontWeight: "bold !important",
        cursor: "pointer"
    },
    margin_right: {
        marginRight: "12px"
    }
}));

const SideBar = ({ userPermissionsData }) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('')
    const [profileImg, setProfileImg] = useState('none')
    const [profile, setProfile] = useState('');

    const handleDrawerOpen = () => {
        setProfileImg('block');
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setProfileImg('none');
        setOpen(false);
    };

    const defineContent = (content) => {
        
        switch (content) {
            case 'SquadUsuario':
                return <SquadUsuario />;
            case 'MinhasInformacoes':
                return <MinhasInformacoes />;            
            case 'Squad':
                return <Squad />;    
            default:
                return;
        }
    }

    const Deslogar = () => {
        localStorage.clear();
        history.push("/login");
    };

    const ImgProfile = async () => {
        const token = localStorage.getItem("token");
       
        let config = {
            headers: {Authorization: "bearer " + token}
        }

        await api.get("/uploadusuario", config)
        .then((response) => {
            console.log("Profile: ", response.data)
            if(response.data.imgurl) {
                setProfile(response.data.imgurl);
            }
        });   
    };
    useEffect(() => {
        if (!content) {
            setContent('content')
        }

        ImgProfile();

    }, [content])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, classes.outlinedPrimary,{
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.inboard}>
                       In<span className={classes.itemColor}>Board</span>
                    </Typography>
                    <div className={classes.grow} />

                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit" className={clsx(classes.outlinedPrimary, classes.margin_right)}>
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton  onClick={() => Deslogar()} size="small" color="inherit" className={clsx(classes.outlinedPrimary, classes.margin_right)}>
                                <AddToHomeScreenIcon className={classes.outlinedPrimary} edge="end" color="inherit"/> Sair
                        </IconButton>

                        {/* <Button onClick={() => Deslogar()} className={classes.outlinedPrimary} edge="end" color="inherit">Sair</Button> */}

                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >   
               
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose} style={{color: "#7A57EA"}} size="medium">
                        {theme.direction === 'rtl' ? <ChevronRightIcon fontSize="large"/> : <ChevronLeftIcon fontSize="large"/>}
                    </IconButton>
                </div>
                <div className="profile_info" id="profile" style={{display: profileImg}}>
                    <div className="profile_img">
                        {/* <img src={profile} alt="profile"/> */}
                        {
                            
                            profile ? <img src={profile} alt="profile" /> : <img src={ProfilePadrao} alt="profile"/>
                           
                        }
                    </div>
                    <div className="profile_data">
                        <p className="name">{localStorage.getItem("nome")}</p>
                    </div>
                </div>
                <Divider />            
                    <List className={classes.itemColor}>
                            {userPermissionsData.map((item) => (
                                    <ListItem button key={item.route}  onClick={() => setContent(item.contentName)} className={classes.outlinedPrimary}>
                                        <span>{defineIcons(item.icon)}</span>
                                        <ListItemText  primary={item.name} style={{ marginLeft: '35px',fontWeight: "900" }} />
                                    </ListItem>                                
                            ))}
                    </List>               
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <ToastContainer/>
                {defineContent(content)}
            </main>
        </div>
    );
}


export default SideBar;