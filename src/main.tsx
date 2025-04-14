import isPropValid from '@emotion/is-prop-valid'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyleSheetManager } from 'styled-components'

import { Calculator } from '@/components/calculator'
import { GlobalStyle } from '@/global/styles'
import { AppProvider } from '@/store/app-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <StyleSheetManager enableVendorPrefixes shouldForwardProp={isPropValid}>
        <GlobalStyle />
        <Calculator />
      </StyleSheetManager>
    </AppProvider>
  </React.StrictMode>,
)
