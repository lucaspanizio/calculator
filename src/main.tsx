import React from 'react';
import ReactDOM from 'react-dom/client';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import { Calculator } from '@/components/calculator';
import { AppProvider } from '@/store/app-provider';
import { GlobalStyle } from '@/global/styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <StyleSheetManager enableVendorPrefixes shouldForwardProp={isPropValid}>
        <GlobalStyle />
        <Calculator />
      </StyleSheetManager>
    </AppProvider>
  </React.StrictMode>,
);
