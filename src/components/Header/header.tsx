import React, { useState } from 'react';
import HeaderContainer from './headerContainer';
import HeaderLink from './headerLink';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setCountryNewsSource } from '../../services/actions/newsActions';

import './header.scss';
import { FLOAT, NEWS_COUNTRY } from '../../services/constants';
import { CATEGORIES_ROUTE, SEARCH_ROUTE, TOP_NEWS_ROUTE } from '../../services/routes';

interface NavigationLink {
  name: string;
  url: string;
  id: number;
}

interface LanguageLink {
  language: string;
  name: string;
  short: string;
}

interface HeaderProps {
  navigationLinks?: NavigationLink[];
  languageLinks?: LanguageLink[];
}

const Header: React.FC<HeaderProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigationLinks = props.navigationLinks || [
    { name: t('Top news'), url: TOP_NEWS_ROUTE, id: 0 },
    { name: t('Categories'), url: CATEGORIES_ROUTE, id: 1 },
    { name: t('Search'), url: SEARCH_ROUTE, id: 2 }
  ];
  const languageLinks = props.languageLinks || [
    { language: 'en-US', name: 'United States', short: 'US' },
    { language: 'en-UK', name: 'Great Britain', short: 'GB' }
  ];
  const [currentCountryValue, setCountryValue] = useState('GB');
  const setCountry = (lng: string) => {
    dispatch(setCountryNewsSource(lng) as any);
    setCountryValue(lng);
  };
  const currentCountry = sessionStorage.getItem(NEWS_COUNTRY) || currentCountryValue;
  return (
    <HeaderContainer>
      {navigationLinks.map(
        link =>
          <HeaderLink
            float={FLOAT.LEFT}
            linkName={link.name}
            url={link.url}
            selected={false}
            key={link.id}
            active={window.location.pathname === link.url}
          />
      )}
      {languageLinks.map(
        language =>
          <HeaderLink
            float={FLOAT.RIGHT}
            linkName={language.short}
            selected={false}
            url={window.location.pathname}
            key={language.short}
            linkCallback={() => setCountry(language.short)}
            active={currentCountry === language.short}
          />
      )}
    </HeaderContainer>
  );
};

export default Header;
