import { Link } from "react-router-dom"
import { FaCartArrowDown } from "react-icons/fa"
import { useAppSelector } from "../app/hooks"

const Navbar = () => {
    const { quantity } = useAppSelector((state) => state.store);

    return (
        <nav className="navbar navbar-dark bg-dark shadow-sm sticky-top ">
            <div className="container-lg my-4">
                <Link className="navbar-brand text-info fw-bold fs-4" to="/">
                    AlphaStore
                </Link>
                <Link to={'/cart'} className={'btn btn-info text-white ms-auto px-4 rounded-pill fw-bold'}>
                    <FaCartArrowDown className={'me-2 fs-4'}/> {quantity}
                </Link>
            </div>
        </nav>
    )
    }

export default Navbar