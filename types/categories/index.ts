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

export interface CategoryForm {
  name: string;
  icon: string;
}
