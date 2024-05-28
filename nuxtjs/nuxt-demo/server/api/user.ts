import Mockjs from 'mockjs'

export default defineEventHandler(async event => {
  return {
    code: 200,
    message: 'success',
    result: 'test'
  }
})
