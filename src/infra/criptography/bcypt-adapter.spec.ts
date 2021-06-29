import bcrypt from "bcrypt"
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve, reject) => resolve('hash'))
  },
  async compare(): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt);
  return sut
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSPy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSPy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSPy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSPy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true when compare succeeds', async () => {
    const sut = makeSut()

    const isValid = await sut.compare('any_value','any_hash')

    expect(isValid).toBe(true)
  })
})