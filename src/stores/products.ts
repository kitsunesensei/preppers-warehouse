import _ from 'lodash'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

enum QuantityUnit {
  KILOGRAM = 'kg',
  MILLIGRAM = 'mg',
  POUND = 'lb',
  LITER = 'l',
  MILLILITER = 'ml',
  PIECE = 'piece',
}

export type ProductItem = {
  id: string
  quantity: number
  expiresAt?: Date
}

export type Product = {
  id: string
  name: string
  identifiers: string[]
  items: ProductItem[]
  minQuantity: number
  quantityUnit: QuantityUnit
}

export type ProductSummary = Product & {
  nextExpiresAt?: Date
  itemsSum: number
}

type State = {
  products: Product[]
}

export const useProductsStore = defineStore('products', {
  state: (): State => ({
    products: [],
  }),
  getters: {
    /**
     * Returns all products with nested items. Items sorted by expires value.
     *
     * @param {State} state
     * @returns {Product[]}
     */
    allProducts(state: State): Product[] {
      return state.products.map((product: Product): Product => {
        product.items.sort((a: ProductItem, b: ProductItem) =>
          !(a.expiresAt && b.expiresAt) || a.expiresAt > b.expiresAt ? -1 : 1
        )

        return product
      })
    },

    /**
     * Returns all products with items and additional calculated information.
     *
     * @returns {ProductSummary[]}
     */
    summary(): ProductSummary[] {
      return this.allProducts.map((product: Product): ProductSummary => {
        const itemsSum: number = _.sumBy(product.items, 'quantity')
        const nextExpiringItem = _.minBy(product.items, 'expiresAt')
        const nextExpiresAt = nextExpiringItem
          ? nextExpiringItem.expiresAt
          : undefined

        return {
          ...product,
          nextExpiresAt,
          itemsSum,
        }
      })
    },
  },
  actions: {
    async addProductStub(name: string): Promise<Product> {
      const product = {
        id: uuidv4(),
        name,
        identifiers: [],
        items: [],
        quantityUnit: QuantityUnit.PIECE,
        minQuantity: 0,
      }

      this.products.push(product)

      return product
    },

    async deleteProduct(product: Product) {
      const index = this.products.indexOf(product)

      if (index >= 0) {
        this.products.splice(index, 1)
      }
    },
  },
})
