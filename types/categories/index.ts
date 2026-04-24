export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface CategoryOption {
  label: string;
  value: number;
}

export interface CategoryForm {
  name: string;
  icon: string;
  iconFile?:File | null;
  preview:string;
}
