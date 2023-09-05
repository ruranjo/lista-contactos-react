import { useEffect, useState } from 'react'
import './App.css'
import { User } from './User.type';
import Navbar from './components/Navbar';
import {FiSearch} from 'react-icons/fi'
import {AiFillPlusCircle} from 'react-icons/ai'
import NotFoundContact from './components/NotFoundContact';
import ContactCart from './components/ContactCart';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDisclouse from "./hooks/UseDisclose";
import Loading from './components/Loading';




function App() {
  const [numberUsersInList, _setNumberUsersInList] = useState<Number>(10)
  const [usersData,setUsersData] = useState<User[]>([])
  const [search,setSearch] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(true);
  const [change,setChange] = useState<boolean>(true);

  //-------------------Hooks----------------------//
  const { isOpen, onClose } = useDisclouse();

  //-------------------useEffect-----------------//
  useEffect( () => {
    
    const fetchData = async () => {
      setLoading(true);
      await fetch(`https://randomuser.me/api/?results=${numberUsersInList}`)
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        setUsersData(data.results);
      })
      .catch((err) => console.error(err));  
    };


    fetchData();

    
  }, [change]);


  //---------------functions----------------//

  
  function userFilter(Users:User[], query:string){
    if( query === ""){
      return Users;
    }
    return Users.filter((user) =>
      user.name.first.toLowerCase().includes(query) ||
      user.name.last.toLowerCase().includes(query) ||
      (user.name.first+" "+user.name.last).toLowerCase().includes(query)
    )
  }

  const handleFilterSearch = (event: React.ChangeEvent<HTMLInputElement>) =>{
     setSearch( event.target.value)
  }

const handleCreateContact = () =>{
  setChange(!change);
}
  
  
  return (
    <>
      <div className='h-full mx-auto max-w-[370px] px-4 wall  border border-orange-400 rounded'>
        
        <Navbar/>

        <div className='flex gap-2'>
          <div className='relative flex flex-grow items-center'>
            <FiSearch className=' absolute ml-2 text-xl3 text-white ' />
            <input 
              onChange={handleFilterSearch} 
              type="text"  
              className='bg-transparent pl-9 text-white border border-white h-10 flex-grow rounded-md'
            />
          </div>
        

          <AiFillPlusCircle onClick={() => handleCreateContact()} className="cursor-pointer text-5xl text-white"/>
        </div>

        {
           loading ? 
           (
            <Loading/>
           )
           :
           ( 
            <div className='mt-4 flex flex-col gap-2'>
              {
                userFilter(usersData, search) && userFilter(usersData,search).length <= 0 ?
                (<NotFoundContact/>)
                :
                (<>
                  {
                    userFilter(usersData, search)?.map((contact, id) => {
                      return (
                        <ContactCart key={id} contact={contact} contacts={usersData} setUsersData={setUsersData}  />
                      )
                    })
                  }
                </>)
              }
            </div>
          )
        }

      </div>

      <ToastContainer position="bottom-center"/>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen}  />
    </>
  )
}

export default App


