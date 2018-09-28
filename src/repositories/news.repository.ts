import { DefaultCrudRepository, juggler } from '@loopback/repository'
import { News } from '../models'
import { inject } from '@loopback/core'

/**
 * Binds REST controllers operations to datasource-specific calls
 */
export class NewsRepository extends DefaultCrudRepository<
  News,
  typeof News.prototype.id
  > {
  /**
   *
   * @param datasource datasource object provided by *.datasource.ts
   */
  constructor(
    @inject('datasources.mongo') protected datasource: juggler.DataSource
  ) {
    super(News, datasource)
  }
}
