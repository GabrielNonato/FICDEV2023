import {NavbarComponent} from '../components/Navbar'
// import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard'


export function Home() {

    return (
        
        <div className="d-flex">
            <div className="col">
                <NavbarComponent/>
                <Dashboard/>
            </div>
        </div>
    );

}