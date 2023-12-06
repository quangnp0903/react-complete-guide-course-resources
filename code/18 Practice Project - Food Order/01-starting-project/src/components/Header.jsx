import { useContext } from 'react';

import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

function Header() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce(
    (totalNumber, item) => totalNumber + item.quantity,
    0
  );

  const handleShowCart = () => userProgressCtx.showCart();

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="" />
        <h1>ReactFood</h1>
      </div>
      <Button textOnly onClick={handleShowCart}>
        Cart ({totalCartItems})
      </Button>
    </header>
  );
}
export default Header;
