import React from 'react'
import Modal from './Modal'

type Props = {
  onClose: () => void,
  isOpen: boolean,
}



const AddAndUpdateContact:React.FC<Props> = ({ isOpen, onClose}) => {
  
  return (
    
    <div>
      <Modal isOpen={isOpen} onClose={onClose} >
        <p>Lorem </p>
      </Modal>
      {isOpen ? "":""}
    </div>
  )
}

export default AddAndUpdateContact

