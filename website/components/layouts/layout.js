import Navbar from '@components/page/navbar'
import Footer from '@components/page/footer'

function Layout(props) {
    return (
        <div className = "container px-4 mx-auto">
        <Navbar />
        {props.children}
        <Footer />
        </div>
    )
}

export default Layout