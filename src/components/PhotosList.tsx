import type {TPhoto, TPhotosListtProps} from "../types";
import { useState } from "react";
import { Image } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "./CustomTable";
import { CustomButton } from './CustomButton';

const PhotosList = (props: TPhotosListtProps) => {
    const navigate = useNavigate();    
   
    const columnHelper = createColumnHelper<TPhoto | undefined[]>();
     
    const [data, setData] = useState(props.transferredData);

    const columns = [
        columnHelper.accessor("id", {
            cell: (info) => info.getValue(),
            header: "ID"
        }),
        columnHelper.accessor("title", {
            cell: (info) => info.getValue(),
            header: "Title"
        }),
        columnHelper.accessor("preview", {
            cell: ({ row }) =>{ 
                const {previewUrl, title} = row.original as TPhoto;

                return(<Image boxSize="50px" src={previewUrl} alt={title} />)
            },
            header: "Preview"
        }),      
        columnHelper.accessor("actions", {
            cell: ({ row }) =>{ return(
                <CustomButton 
                    label="Show"
                    onClick={() => {
                        navigate(`./${row.getValue("title")}`)
                    }}
                />
            )},
            header: () => null,
        })
    ];   
    
    const tableProps = {columns, data};

    return (<CustomTable key={"photos"} {...tableProps} />);
}

export { PhotosList };
