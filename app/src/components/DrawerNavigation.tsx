import React, { useEffect, useState } from 'react'
import { Drawer, List } from '@mui/material'
import { IoImage, IoAlbums, IoCloudUpload, IoEllipsisVertical, IoTrashBin, IoLogOut, IoSettings } from 'react-icons/io5';
import { NavButtonWithIcon } from './NavButtonWithIcon';
import { useLocation } from 'react-router-dom';

type DrawerNavigationProps = {}

const DrawerNavigation = (props: DrawerNavigationProps) => {
    const getWindowSize = () => {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }
    
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [showText, setShowText] = useState<boolean>(false);

    useEffect(() => {
            const handleWindowResize = () => {
                setWindowSize(getWindowSize());
            }
            window.addEventListener('resize', handleWindowResize);
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        }, []);

    useEffect(() => {
        if(windowSize.innerWidth > 800){
            setShowText(true);
        } else {
            setShowText(false)
        }
    },[windowSize.innerWidth])

    const [currentPath, setCurrentPath] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        setCurrentPath(location.pathname);
    },[location])

    const getDesktopNavItems = () => {
        return(
            <>
            <NavButtonWithIcon icon={<IoTrashBin size={'1.5rem'} />} iconText={'Trash'} showIconText={showText} linkLocation={'/trash'} currentPath={currentPath} />
            <NavButtonWithIcon icon={<IoSettings size={'1.5rem'} />} iconText={'Account'} showIconText={showText} linkLocation={'/account'} currentPath={currentPath} />
            <NavButtonWithIcon icon={<IoLogOut size={'1.5rem'} />} iconText={'Logout'} showIconText={showText} linkLocation={'/logout'} currentPath={currentPath} />
            </>
        )
    }

    return (
        <Drawer variant="permanent" open={true} anchor={windowSize.innerWidth > 800 ? 'left' : 'bottom'} className={windowSize.innerWidth < 801 ? 'nav-drawer' : 'nav-drawer  nav-drawer-desktop'}>
            {windowSize.innerWidth > 800 ? <h1><span className="logo">fotostash</span></h1> : null} 
            <List className={windowSize.innerWidth > 800 ? 'nav-desktop' : 'nav-mobile'}>
                <NavButtonWithIcon icon={<IoImage size={'1.5rem'} />} iconText={'Photos'} showIconText={showText} linkLocation={'/'} currentPath={currentPath}/>
                <NavButtonWithIcon icon={<IoAlbums size={'1.5rem'} />} iconText={'Albums'} showIconText={showText} linkLocation={'/albums'} currentPath={currentPath}/>
                <NavButtonWithIcon icon={<IoCloudUpload size={'1.5rem'} />} iconText={'Upload'} showIconText={showText} linkLocation={'/upload'} currentPath={currentPath} />
                {!showText ? 
                <NavButtonWithIcon icon={<IoEllipsisVertical size={'1.5rem'}/>} iconText={'More'} showIconText={showText} currentPath={currentPath}/>
                : getDesktopNavItems()
                }
            </List>
        </Drawer>
    )
}

export default DrawerNavigation