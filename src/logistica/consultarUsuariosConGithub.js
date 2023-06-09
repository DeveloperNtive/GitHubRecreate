import axios from 'axios'

const consultarUsuario = async (userName, page = 1) => {
  try {
    //Variables
    let userUrl = []
    //-----------------------------------Users-----------------------------------
    const response = await axios.get(
      `https://api.github.com/search/users?q=${userName}&page=${page}&per_page=6`,
      // config
      {
        method: 'get',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: 'token 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'
        }
      }
    )
    const userdata = response.data
    //--------------------------------Users URLs--------------------------------
    userUrl = userdata.items.map(x => {
      return x.url
    })
    const usersCompleteInfo = await Promise.all(
      userUrl.map(async userProfile => {
        const response = await axios.get(userProfile)
        return response.data
      })
    )
    //Return
    return {
      totalResultados: userdata.total_count,
      usuarios: usersCompleteInfo,
      status: response.status
    }
  } catch (error) {
    return {
      error: error.response.statusText,
      status: error.response.status
    }
  }
}

export default consultarUsuario
