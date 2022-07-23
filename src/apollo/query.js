import axios from 'axios'
import { POH_THE_GRAPH } from '../store/constant'
axios({
    url: POH_THE_GRAPH,
    method: 'post',
    data: {
        query: `
      submissions {
        id
        name
        status
        registered
        requests(
          first: 1
          where: { registration: true }
          orderBy: creationTime
          orderDirection: desc
        ) {
          evidence(orderBy: creationTime, first: 1) {
            URI
          }
        }
      }
        `
    }
}).then((result) => {
    console.log(result.data)
});