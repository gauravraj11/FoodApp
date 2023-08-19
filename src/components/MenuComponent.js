import React, { useState } from 'react';
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardTitle, Button
} from 'reactstrap';
import DishDetails from './DishdetailComponent';
import CarouselComponent from './CarouselComponent';
import Cart from './CartComponent';
import { useCart } from './CartContext';

export default function Menu(props) {
    const [selectedDish, setSelectedDish]=useState(null);
    const [cart, setCart] = useState([]);
    const [isCartModalOpen, setCartModalOpen] = useState(false);
    const { addToCart } = useCart();

    const  onDishSelect=(dish)=> {
        setSelectedDish(dish);
    }
    const handleAddToCart = (dish) => {
        const updatedCart = [...cart, dish];
        setCart(updatedCart);
        console.log(cart);
        addToCart(dish);
        // dispatch(addToCartAction(dish));
    };
    const toggleCartModal = () => {
        setCartModalOpen(!isCartModalOpen);
    };

    const menu = props.dishes.map((dish) => {
                return (
                    <div className="col-12 col-md-2 m-1">

                        <Card key={dish.id} onClick={() => onDishSelect(dish)}>

                            <CardImg width="100%" src={dish.image} alt={dish.name} />

                            <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                            </CardImgOverlay>
            
                        </Card>
                        <Button onClick={() => handleAddToCart(dish)}>Add to Cart</Button>
                    </div>
                );
            });

            return (
                <div className="container">
                    <div>
                        <CarouselComponent />
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                    <Cart cartItems={cart} toggleModal={toggleCartModal} isModalOpen={isCartModalOpen} />
                    <DishDetails dish={selectedDish} />
                </div>
            );
}

