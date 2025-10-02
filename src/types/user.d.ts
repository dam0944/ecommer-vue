export interface Route {
    title: string;
    path: string;
    name:string;
}

export type Shop = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

export type Category = {
    id:number;
    name:string;
    image:string;
    desc:string;
}

export type Product ={
    id:number;
    name:string;
    desc:string;
    image:string;
    Sku:string;
}


export type MenuChild= {
    title: string
    icon: string
    path: string
}

export type MenuItem={
  title: string
  icon: string
  path?: string
  children?: MenuChild[]
} 