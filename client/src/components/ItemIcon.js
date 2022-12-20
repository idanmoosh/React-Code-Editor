import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/itemIcon.css';

export const ItemIcon = props => {
  const title = props.title;
  const link = props.link;

  return (
    <Link className='itemButton' to={`cases/${link}`}>
      {title}
    </Link>
  );
};
