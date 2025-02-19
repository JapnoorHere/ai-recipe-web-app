"use client";

import React, { useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import {signInUser} from '../../utils/signInSlice';
const Signup = ({ open, onOpenChange }) => {
    const [activeTab, setActiveTab] = useState("signin");
    
    const { showToast } = useToast();
    const navigate = useNavigate();
    
    const fullName = useRef();
    const email = useRef();
    const password = useRef();
    const cPassword = useRef();

    const dispatch = useDispatch();
    const handleSignUp = () => {
        if(fullName.current.value.length < 1){
            showToast("Please enter Full Name", "error")
        }
        else if(email.current.value.length < 1){
            showToast("Please enter Email", "error")
        }
        else if(password.current.value.length < 6){
            showToast("Password should be of at least 6 characters", "error")
        }
        else if(cPassword.current.value !== password.current.value  ){
            showToast("Please enter same password in both the fields", "error")
        }
        else{
            
            fetch(`${import.meta.env.VITE_API_KEY}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: fullName.current.value,
                    email: email.current.value,
                    password: password.current.value
                }),
            })
            .then(async (res)=>{
                if (res.ok) {
                    return res.json();
                }
                else if (res.status === 400) {
                    showToast("Email already exists","error")
                }
            })  
            .then((data) =>{
                if(data.message === "created"){
                    showToast("Welcome " + data.user.name,"success")
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch(signInUser(data.user));
                    onOpenChange(false);
                }
            })
            .catch((error)=>{
                if(error){
                    console.log(error);                
                }
            })
        }
        
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px] bg-white backdrop-blur-sm">
                    <DialogHeader>
                        <DialogTitle>Welcome</DialogTitle>
                        <DialogDescription>
                            Sign in to your account or create a new one.
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs
                        defaultValue="signin"
                        className="w-full"
                        onValueChange={(value) => setActiveTab(value)}
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signin">
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="At least 6 characters" />
                                </div>

                                <Button className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white hover:from-orange-500 hover:to-amber-500 transition-all duration-200">
                                    Sign In
                                </Button>
                                <Button variant="link" className="px-0 font-normal">
                                    Forgot password?
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="signup">
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="signup-email">Name</Label>
                                    <Input id="signup-email" type="place" placeholder="Full Name" ref={fullName} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input id="signup-email" type="email" placeholder="m@example.com" ref={email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input id="signup-password" type="password" placeholder="At least 6 characters" ref={password} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input id="confirm-password" type="password" placeholder="Enter same password" ref={cPassword} />
                                </div>
                                <Button className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white hover:from-orange-500 hover:to-amber-500 transition-all duration-200" onClick={handleSignUp}>
                                    Sign Up
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default Signup;
