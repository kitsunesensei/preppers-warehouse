import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { faker } from '@faker-js/faker'
import { QuantityUnit, useProductsStore } from './products'

describe('Products Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('should add one product to store', () => {
    const store = useProductsStore()

    expect(store.summary).toBeInstanceOf(Array)
    expect(store.summary).lengthOf(0)

    const stubName = faker.animal.cat()

    store.addProductStub(stubName)

    expect(store.summary).lengthOf(1)
    expect(store.summary[0].name).toEqual(stubName)
  })

  it('should delete one product from store', () => {
    const store = useProductsStore()
    const stubProducts = []

    for (let i = 0; i < 3; i++) {
      const stubProduct = {
        id: faker.datatype.uuid(),
        name: 'Test',
        identifiers: faker.datatype.array(),
        items: [],
        minQuantity: faker.random.numeric(),
        quantityUnit: QuantityUnit.PIECE,
      }

      stubProducts.push(stubProduct)
    }

    stubProducts.forEach((stubProduct) => store.products.push(stubProduct))

    expect(store.products).toBeInstanceOf(Array)
    expect(store.products).lengthOf(3)

    store.deleteProduct(stubProducts[1])

    expect(store.products).lengthOf(2)
    expect(store.products[0]).toEqual(stubProducts[0])
    expect(store.products[1]).toEqual(stubProducts[2])
  })

  it('should delete no product from store', () => {
    const store = useProductsStore()
    const stubProducts = []

    for (let i = 0; i < 4; i++) {
      const stubProduct = {
        id: faker.datatype.uuid(),
        name: 'Test',
        identifiers: faker.datatype.array(),
        items: [],
        minQuantity: faker.random.numeric(),
        quantityUnit: QuantityUnit.PIECE,
      }

      stubProducts.push(stubProduct)
    }

    store.products.push(stubProducts[0])
    store.products.push(stubProducts[1])
    store.products.push(stubProducts[2])

    expect(store.products).toBeInstanceOf(Array)
    expect(store.products).lengthOf(3)

    store.deleteProduct(stubProducts[4])

    expect(store.products).lengthOf(3)
    expect(store.products[0]).toEqual(stubProducts[0])
    expect(store.products[1]).toEqual(stubProducts[1])
    expect(store.products[2]).toEqual(stubProducts[2])
  })
})
