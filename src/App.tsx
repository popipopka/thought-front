import {Route, Routes} from 'react-router-dom'
import {Editor, Login, Notes, Register} from '@/pages'
import React from 'react'
import {MainLayout} from '@/features'

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="notes" element={<Notes/>}/>
                <Route path="editor" element={<Editor/>}/>
            </Route>
        </Routes>
    )
}

export default App
