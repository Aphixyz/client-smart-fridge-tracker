interface Categories {
    id: number
    name: string
    icon: string
}

interface CategoriesRespones {
    success: boolean
    message: string
    data: Categories[]
}

export type { Categories,CategoriesRespones }