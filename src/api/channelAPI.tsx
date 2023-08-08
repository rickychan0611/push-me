import { GET, POST } from './apiCalls'
type RouterQueryType = string | string[] | undefined

export const channelAPI = {
  /** Fetch articles by channel id*/
  getChannels: async () => {
    return await GET("/api/general/getchannels", undefined)
  },
  /** Fetch articles by channel id*/
  getArticles: async (channel_id: RouterQueryType, page: number, pagesize: number, orderby: RouterQueryType) => {
    return await GET("/api/userarticle/articles", { channel_id, page, pagesize, orderby })
  },
  /** Fetch articles by user id*/
  getArticlesByUserID: async (author_id: number, pagesize: number, page: number) => {
    return await GET("/api/userarticle/userarticles", { pagesize, page, author_id })
  },
  /** Fetch articles by tag id*/
  getTagArticles: async (tag_id: RouterQueryType, page: number, pagesize: number) => {
    return await GET("/api/userarticle/articles/tag", { tag_id, page, pagesize })
  },
  /** Fetch a signle article by id*/
  getArticle: async (article_id: RouterQueryType) => {
    return await GET("/api/userarticle/article", { article_id })
  },
  /** Fetch a articles by keyword*/
  searchArticles: async (key_word: RouterQueryType, pagesize: number, page: number) => {
    return await GET(`/api/userarticle/articles/search?key_word=${key_word}&pagesize=${pagesize}&page=${page}`, undefined)
  },
  /** Create Comment*/
  createComment: async (body: any) => {
    return await POST("/api/userarticle/article/createcomment", body)
  },
  /** Fetch Comments by post id*/
  getComments: async (article_id: RouterQueryType) => {
    return await GET("/api/userarticle/article/comments", { article_id })
  },
  /** Fetch Children Comments by comment id*/
  getChildrenComments: async (comment_id: number) => {
    return await GET("/api/userarticle/comment/children", { comment_id })
  },
  /** Like or unlike a post by id*/
  likePost: async (article_id: number) => {
    return await POST("/api/userarticle/article/thumbuporcancel", { article_id })
  },
  /** Collect or cancel collect a post*/
  collectPost: async (article_id: number) => {
    return await POST("/api/userarticle/user/favorcancel", { article_id })
  },
  /** Collect or cancel collect a tag*/
  collectTag: async (tag_id: number) => {
    return await POST("/api/userarticle/user/favorcancel", { tag_id })
  },
  /** Follow or unfollow user*/
  followUser: async (author_id: number) => {
    return await POST("/api/userarticle/user/followorcancel", { author_id })
  },
  /** Delete Article*/
  deleteArticle: async (article_id: number) => {
    return await POST("/api/userarticle/article/deleteorcancel", { article_id })
  },
  /** Hide Article*/
  hideArticle: async (article_id: number) => {
    return await POST("/api/userarticle/article/hideorcancel", { article_id })
  },
  /** get Hot Tags*/
  getTags: async () => {
    return await GET("/api/userarticle/tags", { language_id: 0 })
  },
}