import React from 'react'
import './contentRepositories.css'

const ContentRepositories = ({ repositoriesInfo }) => {
  if (repositoriesInfo.length !== 0) {
    if (repositoriesInfo.status === 200) {
      var repos = repositoriesInfo.repos.map(v => (
        <div className='shadow-lg card content-card' key={v.id}>
          <div className='content-elements'>
            <div className='card-body div-img'>
              <img
                src={v.owner.avatar_url}
                className='float-left img'
                alt={v.login}
              />
            </div>
            <div className='div-body'>
              Name: {v.name} <br />
              Owner: {v.owner.login} <br />
              Description: {v.description} <br />
              Main language: {v.language} <br />
              Has issues: {v.has_issues === true ? 'YES' : 'NO'}
              <br />
              Size: {(v.size / 1024).toFixed(2)} GB <br />
              Created at: {v.created_at.substring(0, 10)}
            </div>
            <div className='div-content-buttons'>
              <div className='content-buttons'>
                <a
                  className='btn btn-primary button'
                  href={v.html_url}
                  target='_blank'
                  role='button'
                >
                  View repository
                </a>
                <a
                  className='btn btn-primary button'
                  data-toggle='modal'
                  data-target='#exampleModal'
                  href={v.html_url}
                  target='_blank'
                  role='button'
                >
                  Clone repository
                </a>
                <a
                  className='btn btn-primary button'
                  href={v.owner.html_url}
                  target='_blank'
                  role='button'
                >
                  View ower Profile
                </a>
              </div>
            </div>
          </div>
          <div
            class='modal fade'
            id='exampleModal'
            tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Repo clone Link
                  </h5>
                  <button
                    type='button'
                    class='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div class='modal-body' style={{ textAlign: 'left' }}>
                  <h6>1. Open your command prompt preferred</h6>
                  <h6>2. Then type:</h6>git clone {v.clone_url}
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-dismiss='modal'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    } else {
      repos = (
        <div className='pre-search'>
          <h5>oops! it seems there is an error with GITHUB API</h5>
        </div>
      )
    }
  } else {
    repos = (
      <div className='pre-search'>
        <h5>
          There are no repositories to display or the repository consulted is
          not valid
        </h5>
      </div>
    )
  }

  return (
    <div>
      <h1>Repositories</h1>
      <div>{repos}</div>
    </div>
  )
}

export default ContentRepositories
