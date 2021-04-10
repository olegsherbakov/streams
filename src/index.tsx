import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from '@core/app'
import Frame from '@views/Frame'

const renderInto = (target: HTMLElement) =>
  ReactDOM.render(
    <Provider store={App.store}>
      <Frame />
    </Provider>,
    target
  )

export { App as default, renderInto }
