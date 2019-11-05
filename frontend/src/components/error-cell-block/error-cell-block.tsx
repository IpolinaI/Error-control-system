import * as React from 'react';
import './error-cell-block.css'
import { ROUTES } from '../../services/routes';
import { Link } from 'react-router-dom';

interface ErrorCellBlockProps {
    info: string;
    errorId: number;
}

export const ErrorCellBlock = ({info, errorId}: ErrorCellBlockProps) => (
    <Link className="link" to={ROUTES.HISTORY.replace(':id', `${errorId}`)}>
        <div className="cell__block">
            {info}
        </div>
    </Link>
)