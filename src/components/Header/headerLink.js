import React from 'react';
import { Link } from 'react-router-dom';
import { FLOAT } from '../../services/constants';

const HeaderLink = ({
  linkName,
  url,
  float = FLOAT.LEFT,
  linkCallback,
  active,
  selected = false
}) => {
  if (!linkName) return <div />;
  return (
    <div className={`news-header__header-link${active ? ' active' : ''}`} style={{ float: float }}>
      <Link to={url} className='news-header__header-link' onClick={linkCallback}>
        {linkName}
      </Link>
    </div>
  );
};

export default HeaderLink;

// HeaderLink.propTypes = {
//   linkName: String.isRequired,
//   selected: Boolean,
//   url: String.isRequired,
//   float: Object
// };
