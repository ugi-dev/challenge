import type React from 'react';
import cx from 'classnames';
import type { SectionProps } from './Section.types';

import $ from './Section.module.css';

const Section: React.FC<SectionProps> = ({ children, variant = 'light' }) => {
  return (
    <section
      className={cx($.section, {
        [$.light]: variant === 'light',
        [$.dark]: variant === 'dark'
      })}
    >
      {children}
    </section>
  );
};

export default Section;
