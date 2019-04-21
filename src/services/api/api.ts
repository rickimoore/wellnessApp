import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import axios, { AxiosInstance } from "axios"


/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: AxiosInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = axios.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of users.
   */
  async getRecipes(query) {
    // make the api call
      return axios.get(this.config.url + `?q=${query}&app_id=${this.config.id}&app_key=${this.config.key}&diet=balanced`).catch((error) => {
        console.log(error, "error---")
      })
  }

  /**
   * Gets a single user by ID
   */

  async registerUser(data) {
    // make the api call
      return axios.post(this.config.url + "/register", data).catch((error) => {
          console.log(error.response, "error---lolololol")
      });
  }

  async fetchUserToken(data) {
        // make the api call
        const formattedData = {
            ...data, ...{
                grant_type: 'password',
                client_id: this.config.id.toString(),
                client_secret: this.config.key.toString(),
                scope: '*',
            }
        }
        return axios.post(this.config.url + "/oauth/token", formattedData).catch((error) => {
            console.log(error.response, "error---")
        });
    }

  async fetchUser(accessToken){
      return axios.get(this.config.url + "/api/user", {headers: {'Authorization': 'Bearer ' + accessToken}}).catch((error) => {
          console.log(error.response, "error---")
      });
  }
  
  async fetchFeed(accessToken){
      return axios.get(this.config.url + "/api/post", {headers: {'Authorization': 'Bearer ' + accessToken}})
  }

  async postContent(accessToken, content){
      return axios.post(this.config.url + "/api/post", content,{headers: {'Authorization': 'Bearer ' + accessToken}})
  }
}
