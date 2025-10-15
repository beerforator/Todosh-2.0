import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/providers/store/store.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
)
