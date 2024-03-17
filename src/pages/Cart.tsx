import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Item } from "../interfaces/Item";
import { FaCartShopping } from "react-icons/fa6";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/storeSlice";
import { toast } from "react-toastify";

const Cart = () => {

    const { cartItems, total, quantity } = useAppSelector((state) => state.store);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleCheckout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (quantity === 0 && total === 0) {

            toast.warn('Your cart is empty!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                pauseOnHover: true
            });

            setTimeout(() => {
                navigate('/');
            }, 2000)
            
        } else {
            toast.success('Thanks for purchase', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                pauseOnHover: true
            });

            setTimeout(() => {
                dispatch(clearCart());
                navigate('/');
            }, 2000)
        }
    }


    return (
        <div className="container-lg py-4">
            {
                cartItems.length === 0 && 
                    <div className="text-center flex-column">
                        <h2 className="fw-bold text-dark mb-5">Your Cart is Empty</h2>
                        <>
                        <img src={'../../public/images/emptyCart.png'} alt="" width={200} height={160}/>

                        </>
                        <div>
                            <button 
                                className="btn btn-info text-light mt-4 text-decoration-none align-self-center"
                                onClick={() => navigate('/')}
                            >
                                Go Shopping
                            </button>
                        </div>
                        
                    </div>
            }
            {
                cartItems.length > 0 && 
                <>
                    <div className="text-center">
                        <h2 className="fw-bold text-dark mb-5">Your Cart</h2>
                    </div>
                    <div className="row">
                        {cartItems && cartItems.map((item: Item) => (
                            <CartItem 
                                title={item.title}
                                id={item.id}
                                price={item.price}
                                quantity={item.quantity}
                                imgUrl={item.imgUrl}
                            />
                        ))}
                    </div>
                    <div className="row">
                            
                        <div className="col d-flex align-items-center">
                           
                            <div className="text-info me-2">
                                <FaCartShopping className="fs-3" />
                            </div>
                            <h2 className="fw-bold fs-4 py-4">
                                Cart Summary
                            </h2>
                            <button className="btn btn-outline-info text-info ms-4 text-decoration-none align-self-center" onClick={() => dispatch(clearCart())}>
                                Clear Cart
                            </button>
                        </div>
                        <h4 className="mb-0">Total ({quantity}): {total} $</h4>
                        
                        <div className={'text-center'}>
                            <button 
                                className="btn btn-info text-light mt-4 text-decoration-none align-self-center w-75"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Cart