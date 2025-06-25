import type React from 'react';
import type { CardProps } from './Card.types';

import $ from './Card.module.css';

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className={$.card}>{children}</div>;
};

export default Card;
