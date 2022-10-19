import React, { useEffect, useState } from 'react'
import { Drawer, List } from '@mui/material'
import { IoImage, IoAlbums, IoCloudUpload, IoEllipsisVertical, IoTrashBin, IoLogOut, IoSettings } from 'react-icons/io5';
import { NavButtonWithIcon } from './NavButtonWithIcon';

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
        if(windowSize.innerWidth > 500){
            setShowText(true);
        } else {
            setShowText(false)
        }
    },[windowSize.innerWidth])

    const getDesktopNavItems = () => {
        return(
            <>
            <NavButtonWithIcon icon={<IoTrashBin size={'1.5rem'} />} iconText={'Trash'} showIconText={showText} linkLocation={'/trash'} />
            <NavButtonWithIcon icon={<IoSettings size={'1.5rem'} />} iconText={'Account'} showIconText={showText} linkLocation={'/account'} />
            <NavButtonWithIcon icon={<IoLogOut size={'1.5rem'} />} iconText={'Logout'} showIconText={showText} linkLocation={'/logout'} />
            <NavButtonWithIcon icon={<IoCloudUpload size={'1.5rem'} />} iconText={'WIP Upload'} showIconText={showText} linkLocation={'/dev-upload'} />
            </>
        )
    }

    return (
        <Drawer variant="permanent" open={true} anchor={windowSize.innerWidth < 500 ? 'bottom' : 'left'} className={windowSize.innerWidth > 500 ? 'nav-drawer nav-drawer-desktop' : 'nav-drawer'}>
            {windowSize.innerWidth > 500 ? <h1><span className="logo">fotostash</span></h1> : null} 
            <List className={windowSize.innerWidth < 500 ? 'nav-mobile' : 'nav-desktop'}>
                <NavButtonWithIcon icon={<IoImage size={'1.5rem'} />} iconText={'Photos'} showIconText={showText} linkLocation={'/'} />
                <NavButtonWithIcon icon={<IoAlbums size={'1.5rem'} />} iconText={'Albums'} showIconText={showText} linkLocation={'/albums'} />
                <NavButtonWithIcon icon={<IoCloudUpload size={'1.5rem'} />} iconText={'Upload'} showIconText={showText} linkLocation={'/upload'} />
                {!showText ? 
                <NavButtonWithIcon icon={<IoEllipsisVertical size={'1.5rem'}/>} iconText={'More'} showIconText={showText} />
                : getDesktopNavItems()
                }
            </List>
        </Drawer>
    )
}

export default DrawerNavigation