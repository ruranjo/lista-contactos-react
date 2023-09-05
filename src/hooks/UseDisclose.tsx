import { useState } from "react";

const useDisclouse = () => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
    console.log(isOpen)
  };
  const onClose = () => {
    setOpen(false);
  };
  return { onClose, onOpen, isOpen };
};

export default useDisclouse;