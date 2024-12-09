import type { ICreateFormValues, TCreateAlbumProps } from "../types";
import { useState } from 'react';
import {
    FormErrorMessage,
    FormControl,
    Input,
    Select,
    Button,
    Box,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    Center
  } from "@chakra-ui/react";
import { MainHeader } from "./MainHeader";
import { CustomButton } from "./CustomButton";
import { useNavigate,  useParams } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
    userName: Yup.string().required("User is required"),
});

const CreateAlbum = (props: TCreateAlbumProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const { headTitle, transferredDataMap } = props;
    const album = transferredDataMap.get(`${id}`);

    const { title, userName } = transferredDataMap.get(`${id}`) || {};

    const usersNames = new Set([...transferredDataMap.values()].map(obj => obj.userName));
    
    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ICreateFormValues>({ resolver: yupResolver(validationSchema), mode: "onBlur" });
    
    const navigate = useNavigate();
    
    const onSubmit = (value: ICreateFormValues) => {
        setIsLoading(true);

        setTimeout(() => {
            navigate("/albums", { replace: true });
            setIsLoading(false);

            transferredDataMap.set(`${id}`, {
                id: id || `${transferredDataMap.size}`,
                title: value.title,
                userName: value.userName,
                numberPhotos: album?.numberPhotos || 0,
                photos: album?.photos || [],
                actions: undefined
            });

            console.log("Done");
        }, 3 * 1000); ;
    };

    const handleCancel = () => {
        navigate("/albums", { replace: true });
    };
    
    return (
        <VStack
            h = "100%"
            align = "stretch"
            spacing="35px"
        >
            <MainHeader title={headTitle}>
                <CustomButton label="Back" onClick={() => navigate("../")} />
            </MainHeader>
            <Box w="100%" pt={"9px"}>
                <form>
                    <VStack
                        spacing="24px"
                        alignItems={"start"}
                    >
                        <Wrap spacing={"26px"}>
                            <WrapItem>
                                <Center w="250px" h="80px" bg="red.200">
                                    <FormControl
                                        isInvalid={!!errors?.title?.message} 
                                        mb={4}
                                        isRequired
                                    >
                                        <Input
                                            id="title"
                                            type="title"
                                            placeholder="Title"
                                            {...register("title", { required: true })}
                                            bg="#D9D9D9"
                                            defaultValue={title}
                                        />
                                        <FormErrorMessage>
                                            {errors.title && errors.title.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Center>
                            </WrapItem>
                            <WrapItem>
                                <Center w="250px" h="80px" bg="green.200">
                                    <FormControl 
                                        isInvalid={!!errors?.userName?.message}
                                        mb={4}
                                        isRequired
                                    > 
                                        <Select
                                            id="user"
                                            placeholder="User"
                                            {...register("userName", { required: true })}
                                            bg="#D9D9D9"
                                            defaultValue={userName}
                                        >
                                            {
                                                [...usersNames].map( userName => 
                                                    <option key={userName} value={userName}>{userName}</option>
                                                )
                                            }
                                        </Select>
                                        <FormErrorMessage>
                                            {errors.userName && errors.userName.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Center>
                            </WrapItem>
                        </Wrap>
                        <HStack spacing="17px">
                            <Button 
                                loadingText='Loading'
                                spinnerPlacement='start'
                                onClick={handleSubmit(onSubmit)}
                                mt={4} 
                                colorScheme="teal" 
                                isLoading={isLoading} 
                                type="submit"
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={handleCancel}
                                mt={4} 
                                colorScheme="teal"
                            >
                                Cancel
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </Box>
        </VStack>
    );
}

export { CreateAlbum };
  