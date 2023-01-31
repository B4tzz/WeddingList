/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {ThreeDots} from 'react-loader-spinner';

export function UserDataModal(props : { showLoader: boolean, setShowLoader: Function}) {
    const [open, setOpen] = useState(props.showLoader as boolean | false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const cancelButtonRef = useRef(null);

    const saveUserData = async (email : String, name : String) => {
        const userData = {
            name: name,
            email: email
        }
        localStorage.setItem('USER_DATA', JSON.stringify(userData));
    }

    return (
        <Transition.Root show={props.showLoader} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => {}}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 rounded-lg">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-center shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-8 pt-5 pb-4 sm:p-8 sm:pb-4 rounded-lg border border-gray-200" >
                                <div className="flex flex-col sm:flex sm:items-center ">
                                    <h3 className='text-xl'>Insira seu nome e e-mail</h3>
                                    <form className="flex flex-col items-start w-full m-4">
                                        <label htmlFor="nome">Nome</label>
                                        <input 
                                            className='my-3 border border-gray-300 rounded-md text-lg bg-gray-100 p-1 pl-2 w-full'
                                            type="text" 
                                            id='nome'
                                            name="nome"
                                            placeholder='Seu nome' 
                                            value={nome}
                                            onChange={(e) => {setNome(e.target.value)}}
                                        />
                                        <label htmlFor="email" className='mt-5'>E-mail</label>
                                        <input 
                                            className='my-3 border border-gray-300 rounded-md text-lg bg-gray-100 p-1 pl-2 w-full'
                                            type="text" 
                                            id='email'
                                            name="email"
                                            placeholder='Seu e-mail' 
                                            value={email}
                                            onChange={(e) => {setEmail(e.target.value)}}
                                        />

                                        <div className='flex items-end justify-end w-full mt-5'>
                                        <button
						                	type="submit"
						                	className="flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						                	onClick={() => {saveUserData(email, nome)}}
						                >
						                	Salvar
						                </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}