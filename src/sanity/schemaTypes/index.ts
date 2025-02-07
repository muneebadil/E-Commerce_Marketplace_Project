import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import orders from './orders'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,orders],
}
