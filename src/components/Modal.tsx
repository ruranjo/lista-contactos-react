import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'
type Props = {
    onClose: () => void,
    isOpen: boolean,
    children?: React.ReactNode,  
  }


const Modal:React.FC<Props> = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
        {
            isOpen && (
                <div className="class absolute top-0 z-40 grid h-screen place-items-center backdrop-blur">
                    <div className="class relative z-50 m-auto min-h-[200px] min-w-[80%] bg-white p-4">
                        <div className="flex justify-end">
                            <AiOutlineClose onClick={onClose} className=""/>
                        </div>
                        {children}
                    </div>
                </div>
            )
        }
        
    </>,
    document.getElementById("modal-root")! 
  )
}

export default Modal

