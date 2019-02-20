import * as env from "../../app/environment-variables"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  key: string,
  id: string,

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: env.URL,
  key: env.NUTRITION_API_KEY,
  id: env.API_ID,
  timeout: 10000,
}
