interface Categories {
    id: number
    name: String
    icon: String
}

interface CategoriesRespones {
    success: boolean
    message: string
    data: Categories[]
}

export type { Categories,CategoriesRespones }