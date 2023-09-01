import { useEffect, useState } from 'react'
import './App.css'
import { User } from './User.type';
import Navbar from './components/Navbar';
import {FiSearch} from 'react-icons/fi'
import {AiFillPlusCircle} from 'react-icons/ai'
import NotFoundContact from './components/NotFoundContact';
import ContactCart from './components/ContactCart';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDisclouse from "./hooks/UseDisclose";



function App() {
  const [numberUsersInList, setNumberUsersInList] = useState<Number>(10)
  const [usersData,setUsersData] = useState<User[]>()
  const [search,setSearch] = useState<string>("")

  //-------------------Hooks----------------------//
  const { isOpen, onClose, onOpen } = useDisclouse();

  //-------------------useEffect-----------------//
  useEffect( () => {
    
    const fetchData = async () => {
      await fetch(`https://randomuser.me/api/?results=${numberUsersInList}`)
      .then(res => res.json())
      .then(data => setUsersData(data.results))
      .catch((err) => console.error(err));  
    };

    fetchData();
  }, []);


  //---------------functions----------------//

  const notify = () => {
    toast("Wow so easy!");
  } 

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(event.target.value)
  }
  


  return (
    <>
      <div className='mx-auto max-w-[370px] px-4 class wall'>
        
        <Navbar/>

        <div className='flex gap-2'>
          <div className='relative flex flex-grow items-center'>
            <FiSearch className=' absolute ml-2 text-xl3 text-white ' />
            <input 
              onChange={handleChangeSearch} 
              type="text"  
              className='bg-transparent pl-9 text-white border border-white h-10 flex-grow rounded-md'
            />
          </div>
        

          <AiFillPlusCircle onClick={onOpen} className="cursor-pointer text-5xl text-white"/>
        </div>

        <div className='text-lg'>
          {search}
        </div>

        <div className=''>
            {
              usersData && usersData.length <= 0 ?
              (<NotFoundContact/>)
              :
              (<div>
                {
                  usersData?.map((contact) => {
                    return (
                      <ContactCart key={contact.id.value} contact={contact} />
                    )
                  })
                }
              </div>)
            }
        </div>

      </div>
      <ToastContainer position="bottom-center"/>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
    </>
  )
}

export default App


/*
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContact from "./components/NotFoundContact";
const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              onChange={filterContacts}
              type="text"
              className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>

          <AiFillPlusCircle
            onClick={onOpen}
            className="cursor-pointer text-5xl text-white"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="bottom-center" />
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default App;
*/