import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, className = '', open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      dialog.current.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
export default Modal;
