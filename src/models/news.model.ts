import { Entity, property, model } from '@loopback/repository'

@model()
export class News extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id: number

  @property({
    type: 'string',
    description: 'Title of the news post',
    required: true
  })
  title: string

  @property({
    type: 'string',
    description: 'Main body of news post',
    required: true
  })
  body: string

  @property({
    type: 'string',
    description: 'Date when news post is published'
  })
  datePublished: string

  getId() {
    return this.id
  }

  constructor(data?: Partial<News>) {
    super(data)
  }
}
