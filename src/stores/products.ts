import _ from 'lodash'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

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
    products: [
      {
        id: uuidv4(),
        name: 'Test 1',
        identifiers: [],
        items: [],
      },
      {
        id: uuidv4(),
        name: 'Test 2Test 2Test 2Test 2Test 2Test 2Test 2Test 2Test 2Test 2Test 2',
        identifiers: [],
        items: [
          {
            id: uuidv4(),
            quantity: 3,
            expiresAt: new Date(),
          },
          {
            id: uuidv4(),
            quantity: 100,
            expiresAt: new Date(new Date().setDate(new Date().getDate() - 3)),
          },
        ],
      },
    ],
  }),
  getters: {
    summary(state: State): ProductSummary[] {
      return state.products.map((product: Product): ProductSummary => {
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
})
