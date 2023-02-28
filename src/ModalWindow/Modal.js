import React from 'react';
import './Modal.css';

const Modal = ({activ,setActiv,children})=>{
    return(
        <div className={activ ? "modal activ":"modal"} onClick={()=>{setActiv(false)}}>
            <div className={activ? "modal_content activ" : "modal_content"} onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>

    );
};
export default Modal;