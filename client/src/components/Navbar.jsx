import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '../assets/logo.png';
import Signup from '@/pages/Auth/Signup';
import { useDispatch, useSelector } from 'react-redux';
import {signOutUser, signInUser} from '../utils/signInSlice'
const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const dispatch = useDispatch();
    const signedInUser = useSelector((state)=>state.signedIn.user);

    
    useEffect(()=>{
        const user = localStorage.getItem('user');
        if(user){
            dispatch(signInUser(user));
        }
    },[dispatch]);

    const handleSignOutUser = ()=>{
        dispatch((signOutUser()));
        localStorage.removeItem('user');
    }

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-400 to-orange-400 shadow-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-2 p-1.2">
                        <img className="h-16" src={Logo} alt="Logo" />
                    </Link>
                </div>
                <h1 className='text-white text-2xl font-bold'>FlavorForge AI</h1>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {signedInUser ? (
                        console.log(signedInUser),
                        <Button
                        onClick={handleSignOutUser}
                        className="bg-amber-600 text-white hover:bg-amber-900 transition-all duration-200"
                    >
                        Sign Out
                    </Button>)
                        :
                        (<Button
                            onClick={() => setDialogOpen(true)}
                            className="bg-amber-600 text-white hover:bg-amber-900 transition-all duration-200"
                        >
                            Sign In
                        </Button>)}
                </div>
            </nav>
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gradient-to-r from-orange-400 to-orange-400 px-6 py-6">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-4 text-white text-xl -m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src={Logo}
                                    alt="Logo"
                                />
                                <h1>Flavor Forge AI</h1>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="py-6">
                                    {signedInUser ? (<Button
                                        onClick={handleSignOutUser}
                                        className="w-full bg-amber-600 text-white hover:bg-amber-900 transition-all duration-200"
                                    >
                                        Sign Out
                                    </Button>) :(
                                        <Button
                                        onClick={() => {
                                            setDialogOpen(true);
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full bg-amber-600 text-white hover:bg-amber-900 transition-all duration-200"
                                    >
                                        Sign In
                                    </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Signup open={dialogOpen} onOpenChange={setDialogOpen} />
        </header>
    );
};

export default Navbar;
