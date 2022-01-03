import { registerEnumTypeToTypeGraphql } from '../utils/index'

export enum Risk {
  high = 'high',
  low = 'low',
  medium = 'medium',
}

export enum ShippingMethod {
  aereo = 'aereo',
  rodoviario = 'rodoviario',
  hidroviario = 'hidroviario',
}

registerEnumTypeToTypeGraphql(ShippingMethod, {
  name: 'ShippingMethod',
  description: 'This defines the shipping model',
})

registerEnumTypeToTypeGraphql(Risk, {
  name: 'RiskDefinition',
  description: 'This define what is possible value of risk the freight',
})
