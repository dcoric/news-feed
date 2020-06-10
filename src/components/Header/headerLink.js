import React from 'react';
import { Link } from 'react-router-dom';
import { FLOAT } from '../../services/constants';

const HeaderLink = (props) => {
  const { linkName, url, float, linkCallback, active } = props;
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

HeaderLink.defaultProps = {
  selected: false,
  float: FLOAT.LEFT
};

// HeaderLink.propTypes = {
//   linkName: String.isRequired,
//   selected: Boolean,
//   url: String.isRequired,
//   float: Object
// };
