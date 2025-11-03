import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { HomeOutlined, FileTextOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const { Header: AntHeader } = Layout;

const AppHeader = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const changeLanguage = ({ key: lng }) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const languageMenuItems = [
    { key: 'ru', label: 'Русский' },
    { key: 'en', label: 'English' },
  ];

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: t('home'), path: '/' },
    { key: 'news', icon: <FileTextOutlined />, label: t('news'), path: '/news' },
    ...(isAuthenticated ? [{ key: 'admin', icon: <SettingOutlined />, label: t('admin'), path: '/admin' }] : []),
  ];

  const handleMenuClick = ({ key }) => {
    const item = menuItems.find(i => i.key === key);
    if (item) {
      navigate(item.path);
    }
  };

  return (
    <AntHeader style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 50px'
    }}>
      <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
        {t('news')}
      </div>
      
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        onClick={handleMenuClick}
        style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}
      />

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Dropdown menu={{ items: languageMenuItems, onClick: changeLanguage }}>
          <Button type="text" icon={<GlobalOutlined />} style={{ color: 'white' }}>
            {i18n.language.toUpperCase()}
          </Button>
        </Dropdown>

        {isAuthenticated ? (
          <Button 
            type="primary" 
            danger 
            icon={<LogoutOutlined />}
            onClick={logout}
          >
            {t('logout')}
          </Button>
        ) : (
          <Button 
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigate('/login')}
          >
            {t('login')}
          </Button>
        )}
      </div>
    </AntHeader>
  );
};

export default AppHeader;

