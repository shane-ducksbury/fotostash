import React, { ReactElement } from 'react'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

type NavButtonWithIconProps = {
    icon: ReactElement,
    iconText: string,
    showIconText: boolean,
    linkLocation?: string
}

export const NavButtonWithIcon = ({ icon, iconText, showIconText, linkLocation }: NavButtonWithIconProps) => {

    const generateButtonContent = (icon: ReactElement, iconText: string, showIconText: boolean) => {
        return (<>
            <ListItem>
            <ListItemButton sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
            }}>
                {icon}
                {showIconText ? <ListItemText primary={iconText} /> : null}
            </ListItemButton>
            </ListItem>
        </>)
        }

    return(
        <>
            {linkLocation ?
            <Link to={linkLocation}>{generateButtonContent(icon, iconText, showIconText)}</Link> 
            : generateButtonContent(icon, iconText, showIconText)}
        </>
    )
}