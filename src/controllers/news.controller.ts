import { repository } from '@loopback/repository'
import { NewsRepository } from '../repositories'
import { News } from '../models'
import {
  HttpErrors,
  post,
  param,
  requestBody,
  get,
  put,
  patch,
  del
} from '@loopback/rest'

/**
 * Provides routes for News CRUD operations
 */
export class NewsController {
  constructor(
    @repository(NewsRepository) protected repo: NewsRepository
  ) { }

  @get('/news')
  async findNews(): Promise<News[]> {
    return await this.repo.find()
  }

  @get('/news/{id}')
  async findNewsById(
    @param.path.number('id') id: number
  ): Promise<News> {
    return await this.repo.findById(id)
  }

  @post('/news')
  async createNews(
    @requestBody() news: News
  ): Promise<News> {
    if (!news.title) {
      throw new HttpErrors.BadRequest('title is required')
    }
    return await this.repo.create(news)
  }

  @put('/news')
  async updateNews(
    @requestBody() news: News
  ): Promise<boolean> {
    return await this.repo.update(news)
  }

  @patch('/news/{id}/publish')
  async publishNews(
    @param.path.number('id') id: number,
    @requestBody() datePublished: Date
  ): Promise<boolean> {
    const news = this.repo.findById(id)
    return await this.repo.updateById(id,
      Object.assign({}, news, { datePublished: datePublished }))
  }

  @patch('/news/{id}')
  async updateNewsById(
    @param.path.number('id') id: number,
    @requestBody() news: News
  ): Promise<boolean> {
    return await this.repo.updateById(id, news)
  }

  @del('/news/{id}')
  async deleteNewsByPmid(
    @param.path.number('id') id: number
  ): Promise<boolean> {
    return await this.repo.deleteById(id)
  }
}
