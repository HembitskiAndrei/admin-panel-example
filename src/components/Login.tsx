import { useState, useEffect } from 'react';
import {
    FormErrorMessage, 
    FormControl,
    Input,
    Button,
    Box,
    AbsoluteCenter,
    VStack,
    Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { ILoginFormValues } from "../types";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../provider/authProvider";

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ILoginFormValues>({ resolver: yupResolver(validationSchema), mode: "onBlur" });
    
    const { setToken } = useAuth();

    const navigate = useNavigate();
    
    const onSubmit = (values: ILoginFormValues) => {
        setIsLoading(true);

        setTimeout(() => {
            setToken(new Date().toISOString());
            navigate("/", { replace: true });
            setIsLoading(false);
            console.log("Done");
        }, 3 * 1000); 
    }
    
    return (
        <form>
            <Box>
                <AbsoluteCenter axis="both">
                    <VStack>                 
                        <Heading color="gray" as="h3" size="md" padding={4}>Sign In</Heading>
                        <FormControl 
                            isInvalid={!!errors?.email?.message}
                            mb={4}
                            isRequired
                        >
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                {...register('email', { required: true })}
                                bg="#D9D9D9"
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl 
                            isInvalid={!!errors?.password?.message}
                            mb={4}
                            isRequired
                        > 
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register('password', { required: true })}
                                bg="#D9D9D9"
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            loadingText='logining'
                            spinnerPlacement='start'
                            onClick={handleSubmit(onSubmit)}
                            mt={4} 
                            colorScheme="teal" 
                            isLoading={isLoading}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </VStack>
                </AbsoluteCenter >
            </Box>
        </form>
    );
}

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
  
    return (
        <Button
            onClick={() => {
                setToken("")
                navigate('/');
            }}
            colorScheme="teal"
        >
            Log out
        </Button>
    )
}

export { Login, Logout };
