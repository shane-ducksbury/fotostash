import React, { ReactElement } from 'react'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

type NavButtonWithIconProps = {
    icon: ReactElement,
    iconText: string,
    showIconText: boolean,
    currentPath: string,
    linkLocation?: string
}

export const NavButtonWithIcon = ({ icon, iconText, showIconText, linkLocation, currentPath }: NavButtonWithIconProps) => {

    const generateButtonContent = (icon: ReactElement, iconText: string, showIconText: boolean) => {
        return (<>
            <ListItem>
            <ListItemButton sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
            }} className='nav-button'>
                {icon}
                {showIconText ? <ListItemText primary={iconText} /> : null}
            </ListItemButton>
            </ListItem>
        </>)
        }

    const checkPath = () => {
        if(!linkLocation) return undefined
        if(currentPath !== '/' && linkLocation === '/') return undefined
        if(currentPath.includes(linkLocation)) return 'nav-selected'
        return undefined
    }

    return(
        <>
            {linkLocation ?
            <Link to={linkLocation} className={checkPath()}>{generateButtonContent(icon, iconText, showIconText)}</Link> 
            : generateButtonContent(icon, iconText, showIconText)}
        </>
    )
}