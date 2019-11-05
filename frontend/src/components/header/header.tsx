import React from 'react';
import './header.css';
import { ROUTES } from '../../services/routes';
import { NavLink } from 'react-router-dom';

interface LinkProps {
	to: string;
	children: any;
}

const Link = ({ to, children }: LinkProps) => (
    <NavLink
        exact
        className='nav__link'
        activeClassName="nav__link__active"
        to={to}
    >
        {children}
    </NavLink>
)

export const Header = () => (
    <header>
        <nav className="nav__menu"> 
            <Link to={ROUTES.ERRORS}>
                СПИСОК ОШИБОК
            </Link>
            <Link to={ROUTES.CREATION}>
                ДОБАВИТЬ ОШИБКУ
            </Link>
            <Link to={ROUTES.ENTER}>
                ВЫХОД
            </Link>
        </nav>
    </header>
)