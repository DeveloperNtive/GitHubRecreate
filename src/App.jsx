/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css'
import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import ContentUser from './components/contentUsers'
import consultarUsuario from './logistica/consultarUsuariosConGithub'
import ContentRepositories from './components/contentRepositories'
import consultarRepo from './logistica/consultarRepositoriesConGithub'

const App = () => {
  //States
  const [user, setUser] = useState([])
  const [repositories, setRepositories] = useState([])
  const [pagination, setPagination] = useState(1)
  const [typeReq, setTypeReq] = useState('users')
  const [search, setSearch] = useState('')

  //LifeCycle

  return (
    <div className='App'>
      <nav className='shadow-lg navbar navbar-expand-lg navbar-light bg-dark'>
        <a
          className='navbar-brand github-color'
          onClick={() => {
            setUser([])
            setRepositories([])
            setSearch('')
            setTypeReq('users')
          }}
        >
          GitHub
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className={`nav-item ${typeReq === 'users' ? 'active' : null}`}>
              <a
                className='nav-link links'
                onClick={() => {
                  setTypeReq('users')
                  setRepositories([])
                }}
              >
                Users
              </a>
            </li>
            <li
              className={`nav-item ${
                typeReq === 'repositories' ? 'active' : null
              }`}
            >
              <a
                className='nav-link links'
                onClick={() => {
                  setTypeReq('repositories')
                  setUser([])
                }}
              >
                Respositories
              </a>
            </li>
          </ul>
          <Formik
            initialValues={{ search: '' }}
            onSubmit={async values => {
              setSearch(values.search)
              if (typeReq === 'users') {
                const usuarios = await consultarUsuario(values.search)
                setUser(usuarios)
              } else {
                const repositories = await consultarRepo(values.search)
                setRepositories(repositories)
              }
            }}
          >
            <Form className='form-inline my-2 my-lg-0 form-search'>
              <Field
                name='search'
                className='form-control mr-sm-2'
                placeholder='tom, windows, google'
              />
              <button className='btn btn-success my-2 my-sm-0' type='submit'>
                Search
              </button>
            </Form>
          </Formik>
        </div>
      </nav>
      {typeReq === 'users' ? (
        <ContentUser userInfo={user} />
      ) : (
        <ContentRepositories repositoriesInfo={repositories} />
      )}
      <div className='pagination'>
        <nav aria-label='Page navigation example'>
          <ul className='pagination'>
            <li className='page-item'>
              <a
                className='page-link pagination-button'
                onClick={async () => {
                  if (pagination > 1) {
                    setPagination(pagination - 1)
                    if (typeReq === 'users') {
                      const usuarios = await consultarUsuario(
                        search,
                        pagination - 1
                      )
                      setUser(usuarios)
                    } else {
                      const repositories = await consultarRepo(
                        search,
                        pagination - 1
                      )
                      setRepositories(repositories)
                    }
                  }
                }}
              >
                Previous
              </a>
            </li>
            <li className='page-item'>
              <a
                className='page-link pagination-button'
                onClick={async () => {
                  setPagination(pagination + 1)
                  if (typeReq === 'users') {
                    const usuarios = await consultarUsuario(
                      search,
                      pagination + 1
                    )
                    setUser(usuarios)
                  } else {
                    const repositories = await consultarRepo(
                      search,
                      pagination + 1
                    )
                    setRepositories(repositories)
                  }
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default App
