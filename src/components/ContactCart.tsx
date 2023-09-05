
import { User } from '../User.type'
import useDisclouse from '../hooks/UseDisclose';
import  AddAndUpdateContact  from './AddAndUpdateContact'
// import  {HiOutlineUserCircle}  from 'react-icons/hi'
import { IoMdTrash } from "react-icons/io";

//funciones



type Props = {
  contact:User, 
  contacts:User[],
  setUsersData: (user:User[]) => void
  
}

const ContactCart:React.FC<Props> = ({contact, contacts, setUsersData}) => {
  const { isOpen, onClose } = useDisclouse();

  const deleteContact = (list: User[], contactToRemove: User) => {
    console.log("hola")
    console.log(list)
    const auxlist = [ ...list]
    auxlist.forEach(function(contact, index) {
      if (contact.id === contactToRemove.id) {
        auxlist.splice(index, 1);
        setUsersData(auxlist)
      }
    });
  }

  return (
    <> 
        <div key={contact.id.name} className="flex items-center justify-between rounded-lg bg-yellow p-2 border-2 border p-4">
          
          <div className='flex gap-1'>
            <img src={contact.picture.thumbnail} alt="" className='rounded-full text-4xl text-orange border border-2 border-orange-400' />  
            <div className=''>
              <h2 className="font-medium">{contact.name.first +" "+ contact.name.last}</h2>
              <p className="text-xs">{contact.email}</p>
            </div>
          </div>
          <div className="flex text-3xl">
            <IoMdTrash  className="cursor-pointer" onClick={() => deleteContact(contacts,contact)} />
          </div>

        </div>
        <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    </>
  )
}

export default ContactCart

