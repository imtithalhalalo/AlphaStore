import React, { useState } from "react";
import { useItemsQuery } from "../features/itemsAPi";
import { Item } from "../interfaces/Item";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/storeSlice";

const Landing = () => {
    const { data } = useItemsQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [keyFilter, setKeyFilter] = useState('default');
    const [addingToCartItemId, setAddingToCartItemId] = useState(null);

    const dispatch = useAppDispatch();

    const filteredItems = data?.filter((item: Item) => (
        searchTerm.trim() === '' 
            ? true
            : item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    const sortedItems = (data: Item[]) => {
        switch(keyFilter) {
            case 'low':
                return data && data.slice().sort((a: Item, b: Item) => a.price - b.price);
            case 'high':
                return data && data.slice().sort((a: Item, b: Item) => b.price - a.price);
            case 'a-z':
                return data && data.slice().sort((a: Item, b: Item) => a.title.localeCompare(b.title));
            case 'z-a':
                return data && data.slice().sort((a: Item, b: Item) => b.title.localeCompare(a.title));
            default:
                return data;
        }
    };

    const items = sortedItems(filteredItems || data || []);

    const handleAddToCart = (item: any) => {
        setAddingToCartItemId(item.id); // Set the currently adding item ID

        setTimeout(() => {
            dispatch(addToCart(item));
            setAddingToCartItemId(null); // Reset the currently adding item ID after adding to cart
        }, 2000);
    };

    return (
        <div className="container-lg py-4">
            <div className="input-group mb-3">
                <input 
                    type="search" 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} 
                    className="form-control" 
                    aria-label="Text input with dropdown button" 
                />
                <button className="btn btn-info dropdown-toggle text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sort By</button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li className="dropdown-item">
                        <label htmlFor="default" className={`form-check-label ${keyFilter === 'default' ? 'active' : ''}`}>
                            <input 
                                type="radio" 
                                id="default" 
                                name="sort" 
                                className="form-check-input" 
                                value="default" 
                                checked={keyFilter === 'default'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyFilter(e.target.value)}
                            />
                            Default
                        </label>
                    </li>
                    <hr className="dropdown-divider bg-light" />
                    <li className="dropdown-item">
                        <label htmlFor="low" className={`form-check-label ${keyFilter === 'low' ? 'active' : ''}`}>
                            <input 
                                type="radio" 
                                id="low" 
                                name="sort" 
                                className="form-check-input" 
                                value="low" 
                                checked={keyFilter === 'low'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyFilter(e.target.value)}
                            />
                            Price (Lowest)
                        </label>
                    </li>
                    <li className="dropdown-item">
                        <label htmlFor="high" className={`form-check-label ${keyFilter === 'high' ? 'active' : ''}`}>
                            <input 
                                type="radio" 
                                id="high" 
                                name="sort" 
                                className="form-check-input" 
                                value="high" 
                                checked={keyFilter === 'high'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyFilter(e.target.value)}
                            />
                            Price (Highest)
                        </label>
                    </li>
                    <li className="dropdown-item">
                        <label htmlFor="a-z" className={`form-check-label ${keyFilter === 'a-z' ? 'active' : ''}`}>
                            <input 
                                type="radio" 
                                id="a-z" 
                                name="sort" 
                                className="form-check-input" 
                                value="a-z" 
                                checked={keyFilter === 'a-z'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyFilter(e.target.value)}
                            />
                            A-Z
                        </label>
                    </li>
                    <li className="dropdown-item">
                        <label htmlFor="z-a" className={`form-check-label ${keyFilter === 'z-a' ? 'active' : ''}`}>
                            <input 
                                type="radio" 
                                id="z-a" 
                                name="sort" 
                                className="form-check-input" 
                                value="z-a" 
                                checked={keyFilter === 'z-a'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyFilter(e.target.value)}
                            />
                            Z-A
                        </label>
                    </li>
            </ul>

            </div>
            {
                !items || items.length === 0 && <h2>No items for now</h2>
            }
            <div className="row">
                {
                    items && items.map((item: Item, index: number) => (
                        <div key={index} className="col-md-6 col-lg-4 text-center mb-5">
                            <div className="py-4">
                                <div className={'py-2 rounded bg-body-secondary'}>
                                    <img src={item.imgUrl} alt={item.title} width={180} height={180} className="rounded" />
                                    <h3 className="fs-5 my-4">
                                        {item.title}
                                    </h3>
                                    <h2 className="fs-4 my-2 fw-bold lead">
                                        {item.price} $
                                    </h2>
                                    <button
                                        className="btn btn-info my-4 ms-2 text-decoration-none text-light"
                                        onClick={() => handleAddToCart(item)}
                                        disabled={addingToCartItemId === item.id} // Disable the button while this item is being added
                                    >
                                        {addingToCartItemId === item.id ? (
                                            <>
                                                <FaCartArrowDown className="me-2 fs-5" />
                                                Adding to Cart...
                                            </>
                                        ) : (
                                            <>
                                                <FaCartPlus className="me-2 fs-5" />
                                                Add To Cart
                                            </>
                                        )}
                                    </button>
                                </div>
                                
                                
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Landing;
