import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import 'moment/locale/ru';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';

const { Sider } = Layout;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <ConfigProvider
            locale={ruRU}
            theme={{
              token: theme,
              layout: {
                siderWidth: 300,
                siderBgColor: '#fafafa',
                contentPadding: '24px',
                headerHeight: '64px',
                footerHeight: '60px',
              },
            }}
          >
            <App />
          </ConfigProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>

  </React.StrictMode>
);
