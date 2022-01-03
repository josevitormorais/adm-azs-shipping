import { registerEnumType } from 'type-graphql'
import { EnumConfig } from 'type-graphql/dist/decorators/types'

function registerEnumTypeToTypeGraphql<TEnum extends object>(
  enumObj: TEnum,
  enumConfig: EnumConfig<TEnum>
): void {
  return registerEnumType(enumObj, enumConfig)
}

export { registerEnumTypeToTypeGraphql }
