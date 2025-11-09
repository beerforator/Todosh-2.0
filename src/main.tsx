import { createRoot } from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/providers/store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.tsx'

// import '@fullcalendar/react/dist/main.css'; 

// // 2. Импортируем стили для ПЛАГИНА СЕТКИ МЕСЯЦА из его папки /dist
// import '@fullcalendar/daygrid/dist/main.css';

// import '@fullcalendar/core/main.css'; 

// 2. Импортируем стили для ПЛАГИНА СЕТКИ МЕСЯЦА, который мы используем
// import '@fullcalendar/daygrid/main.css';
createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    // </React.StrictMode>,
)
