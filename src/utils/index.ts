import { registerEnumType } from 'type-graphql'
import { EnumConfig } from 'type-graphql/dist/decorators/types'
import { createConnection, getConnectionOptions } from 'typeorm'

function registerEnumTypeToTypeGraphql<TEnum extends object>(
  enumObj: TEnum,
  enumConfig: EnumConfig<TEnum>
): void {
  return registerEnumType(enumObj, enumConfig)
}

const calculateCubageFreight = (
  height: number,
  length: number,
  width: number,
  cubageFactor: number
): number => {
  const transformCentimetersToMeters = (value: number): number => value / 100
  const kiloGram = 1000

  const calcResult = [height, length, width].reduce(
    (previousValue, currentValue) => {
      if (previousValue === 0) {
        return (previousValue = transformCentimetersToMeters(currentValue))
      }
      return (previousValue =
        transformCentimetersToMeters(currentValue) * previousValue)
    },
    0
  )

  return Number(calcResult * cubageFactor * kiloGram)
}

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
  return createConnection({ ...connectionOptions, name: 'default' })
}

export { registerEnumTypeToTypeGraphql, calculateCubageFreight }
