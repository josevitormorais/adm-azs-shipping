import { Resolver, Query } from 'type-graphql'

@Resolver()
export class HelloResolver {
  @Query(() => String)
  available() {
    return 'Application available'
  }
}
