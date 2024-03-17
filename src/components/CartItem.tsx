import { Item } from "../interfaces/Item";
import { decrease, increase, removeFromCart } from '../features/storeSlice';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useAppDispatch } from "../app/hooks";

const CartItem = ({
    title,
    id,
    imgUrl,
    price,
    quantity
}: Item) => {
    const dispatch = useAppDispatch();
    return (
        <div key={id} className="col-md-6 col-lg-4 text-left mb-5">
            <div className="py-4 d-flex flex-row align-items-center gap-3">
                <div className="mb-3">
                    <img src={imgUrl} alt={title} width={120} height={120} className="rounded" />
                </div>
                <div className="text-right">
                    <h3 className="fs-6 my-2">{title}</h3>
                    <p className="fs-9 mb-2 text-black-50 ">{quantity}</p>
                    <h2 className="fs-9 mb-2 fw-bold lead text-secondary">{price * quantity} $</h2>
                </div>
                <button className="btn btn-outline-info" onClick={() => { 
                    dispatch(increase({ id })) 
                }}>
                    <FaPlus className="fs-7" />
                </button>
                
                <button className="btn btn-outline-info" onClick={() => {
                    if (quantity === 1) {
                        dispatch(removeFromCart(id))
                        return
                    }
                    dispatch(decrease({ id }))
                    
                }}>
                    <FaMinus className="fs-7" />
                </button>
                <button className="btn btn-info" onClick={() => { dispatch(removeFromCart(id)) }}>
                    <FaTrashAlt className="fs-7" />
                </button>
            </div>
        </div>
    )
}

export default CartItem