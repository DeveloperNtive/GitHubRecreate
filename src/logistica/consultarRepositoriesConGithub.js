import axios from 'axios'

const consultarRepo = async (repoName, page = 1) => {
  try {
    //Variables
    let repoUrl = []
    //-----------------------------------Users-----------------------------------
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${repoName}&page=${page}&per_page=6`,
      // options
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: 'token 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'
        }
      }
    )
    const repoData = response.data
    //--------------------------------Users URLs--------------------------------
    repoUrl = repoData.items.map(x => {
      return x.url
    })
    const repoCompleteInfo = await Promise.all(
      repoUrl.map(async repoLink => {
        const response = await axios.get(repoLink)
        return response.data
      })
    )
    //Return
    return {
      totalResultados: repoData.total_count,
      repos: repoCompleteInfo,
      status: response.status
    }
  } catch (error) {
    return {
      error: error.response.statusText,
      status: error.response.status
    }
  }
}

export default consultarRepo
