import React from 'react'
import './contentUsers.css'
import './contentRepositories'

const ContentUser = ({ userInfo }) => {
  if (userInfo.length !== 0) {
    if (userInfo.status === 200) {
      var users = userInfo.usuarios.map(v => (
        <div className='shadow-lg card content-card' key={v.id}>
          <div className='content-elements'>
            <div className='card-body div-img'>
              <img
                src={v.avatar_url}
                className='float-left img'
                alt={v.login}
              />
            </div>
            <div className='content-body'>
              Name: {v.name} <br />
              Nickname: {v.login} <br />
              Email: {v.email} <br />
              Nationality: {v.location} <br />
              Company: {v.company} <br />
              Repos: {v.public_repos} <br />
              Followers: {v.followers} <br />
              Following: {v.following} <br />
              Bio: {v.bio} <br />
              Created at: {v.created_at.substring(0, 10)}
            </div>
            <div className='div-content-buttons'>
              <div className='content-buttons'>
                <a
                  className='btn btn-primary float-right button'
                  href={v.html_url}
                  target='_blank'
                  role='button'
                >
                  View profile
                </a>
              </div>
            </div>
          </div>
        </div>
      ))
    } else {
      users = (
        <div className='pre-search'>
          <h5>oops! it seems there is an error with GITHUB API</h5>
        </div>
      )
    }
  } else {
    users = (
      <div className='pre-search'>
        <h5>
          There are no users to display or the user consulted is not valid
        </h5>
      </div>
    )
  }

  return (
    <div>
      <h1>Users</h1>
      <div>{users}</div>
    </div>
  )
}

export default ContentUser
