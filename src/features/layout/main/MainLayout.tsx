import {Outlet} from 'react-router-dom'
import {Header, Navbar} from '@components/layout'


const MainLayout = () => {
    return (
        <>
            <Header/>
            <Navbar/>
            <Outlet/>
        </>
    )
}

export default MainLayout
