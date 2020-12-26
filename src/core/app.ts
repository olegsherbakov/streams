import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import thunk from 'redux-thunk'

import { IDependencies, IState, ActionTypes } from '@core/types'
import { system, form } from '@core/reducers'

function configStore(preloadedState?: IState): Store<IState, ActionTypes> {
  const dependencies: IDependencies = {
    log: (message) => console.log(message),
  }

  return createStore(
    combineReducers({
      system,
      form,
    }),
    preloadedState,
    applyMiddleware(thunk.withExtraArgument(dependencies))
  )
}

const App = {
  name: `streams`,
  store: configStore(),
}

export default App
