import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import '@/index.css'
import {ChakraProvider, CSSReset} from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider>
                <CSSReset/>
                <div style={{backgroundColor: '#b4befe'}}>
                    <App/>
                </div>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
)
