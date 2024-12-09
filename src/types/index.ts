import type { PropsWithChildren } from 'react';
import type { ColumnDef } from "@tanstack/react-table";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ICreateFormValues {
  title: string;
  userName: string;
}

export type TPhoto = {
  id: number;
  title: string;
  preview: any;
  previewUrl: string;
  url: string;
  actions: any;
};

export type TAlbum = {
  id: string;
  title: string;
  userName: string;
  numberPhotos: number;
  photos: TPhoto[]
  actions: any;
};

export type TTransferredDataMap = Map<string, TAlbum>;

export type TAlbumsListProps = PropsWithChildren & {
  transferredDataMap: TTransferredDataMap;    
};

export type TCreateAlbumProps = {
  headTitle?: string;    
  transferredDataMap: TTransferredDataMap;
};

export type TCustomButtonProps = {
  label?: string;   
  onClick?: () => void;
};

export type TDataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export type TMainComponentProps = PropsWithChildren;

export type TMainHeaderProps = PropsWithChildren & {
  title?: string;  
};

export type TPhotosListtProps = { transferredData: TPhoto[]; };

export type TShowAlbumProps = {
  transferredDataMap: TTransferredDataMap;
};

export type TShowPhotoProps = {
  transferredDataMap: Map<string, Map<string, TPhoto>>;
};

export type TProtectedRouteProps = {
  auth: {
      isAuthenticated: boolean
  };    
}
