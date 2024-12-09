
import type { TAlbum, TAlbumsListProps } from "../types";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { VStack } from "@chakra-ui/react";
import { MainHeader } from "./MainHeader";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "./CustomTable";
import { CustomButton } from './CustomButton';

const AlbumsList = (props: TAlbumsListProps) => {
    const navigate = useNavigate();
   
    const columnHelper = createColumnHelper<TAlbum | undefined[]>();
    
    const { transferredDataMap } = props;
    const [data, setData] = useState(transferredDataMap);
    const [dataTable, setDataTable] = useState([...data.values()]);

    const columns = [
        columnHelper.accessor("id", {
            cell: (info) => info.getValue(),
            header: "ID"
        }),
        columnHelper.accessor("title", {
            cell: (info) => info.getValue(),
            header: "Title"
        }),
        columnHelper.accessor("userName", {
            cell: (info) => info.getValue(),
            header: "User name"
        }),
        columnHelper.accessor("numberPhotos", {
            cell: (info) => info.getValue(),
            header: "Number of photos",
        }),
        columnHelper.accessor("actions", {
            cell: ({ row }) =>{ return(
                    <>
                        <CustomButton 
                            label="Show"
                            onClick={() => {
                                navigate(`./${row.getValue("id")}`)
                            }}
                        />
                        <CustomButton 
                            label="Edit"
                            onClick={() => {
                                navigate(`./${row.getValue("id")}/edit`)
                            }}
                        />
                        <CustomButton 
                            label="Delete"
                            onClick={() => {
                                transferredDataMap.delete(`${row.getValue("id")}`);
                                setData(transferredDataMap);
                                setDataTable([...transferredDataMap.values()]);
                            }}
                        />
                    </>
                )},
            header: () => null,
        })
    ];   
    
    const tableProps = {columns, data: dataTable};

    return (
        <>
            <VStack
                h = "100%" 
                align = "stretch"
                justify = "space-between"
            >
                <MainHeader title="Albums">
                    <CustomButton label="Create" onClick={() => navigate("./create")} />
                </MainHeader >
                <CustomTable key={"albums"} {...tableProps} />
            </VStack>
        </>
    );
}

export { AlbumsList };
