import request from 'supertest'
import app from '../config/app'

describe('SingUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/singup')
      .send({
        name: 'Diogo',
        email: 'diogojorge1401@gmail.com',
        password: '1234',
        passwordConfirmation:'1234'
      })
      .expect(200)
  })
})