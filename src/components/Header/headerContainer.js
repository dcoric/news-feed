import React from 'react';

const HeaderContainer = (props) => {
  return (
    <div className='news-header'>
      <div className='news-header__container'>
        {props.children}
      </div>
    </div>
  );
};

export default HeaderContainer;
