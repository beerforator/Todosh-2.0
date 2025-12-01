import React from "react";

import { NavLink } from "react-router-dom";

import styleH from '@/app/styles/Header.module.scss'
import style from '@/app/styles/IconStyles.module.scss'

interface HeaderNavLinkProps {
    path: string,
    ItemIcon: React.ReactNode,
    isLogo: boolean
}

export const HeaderNavLink = React.memo(({ path, ItemIcon, isLogo }: HeaderNavLinkProps) => {
    return (
        <NavLink
            to={path}
            className={isLogo
                ? (styleH.navLink + ' ' + styleH.navLinkUser)
                : styleH.navLink}
        >
            <div className={style.iconContainer}>
                {ItemIcon}
            </div>
        </NavLink>
    );
});


