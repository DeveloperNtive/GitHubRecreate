import consultarUsuario from './logistica/consultarUsuariosConGithub'
import consultarRepo from './logistica/consultarRepositoriesConGithub'

test('consultarUsuario: Debe retornar un objeto', async() => {
  const userData = await consultarUsuario('DeveloperNtive')
  expect(typeof userData === 'object').toBe(true)
})

test('consultarRepo: Debe retornar un objeto', async() => {
  const repoData = await consultarRepo('windows')
  expect(typeof repoData === 'object').toBe(true)
})

test('consultarUsuario: El objeto debe entregar un status', async() => {
  const userData = await consultarUsuario('DeveloperNtive')
  expect(userData.hasOwnProperty('status')).toBe(true)
})

test('consultarRepo: El objeto debe entregar un status', async() => {
  const repoData = await consultarRepo('windows')
  expect(repoData.hasOwnProperty('status')).toBe(true)
})
