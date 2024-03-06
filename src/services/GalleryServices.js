import HttpServices from './http.service';

export default class GalleryServices extends HttpServices {
static async GetAll(page =1, search = ''){

  const response = await this.request({
    method: 'GET',
    url: '/galleries',
    params:{
      perPage: 10,
      page,
      search,
    }
  })

  return{data:response.data, metadata: response.metadata}
}

static async getSingleGallery(id){
  const response = await this.request({
    method: 'GET',
    url: `/galleries/${id}`
  })

  return {response}
}




static async DeleteGallery(id){
  const response = await this.request({
    method: 'DELETE',
    url: `/galleries/${id}`
  })
  return response
}

static async create(data) {
  const response = await this.request({
      method: "POST",
      url: "/create",
      data,
  });

  
  return {response}
}

static async updateGallery(id, data) {
  const response = await this.request({
    method: 'PUT',
    url: `/galleries/${id}`,
    data,
  });
  return  {response} ;
}

static async getComments(){
  const response = await this.request({
    method: 'GET',
    url: '/comments'

  })
  return {data:response}
}

static async deleteComment(id){
  const response = await this.request({
    method: 'DELETE',
    url: `/comments/${id}`
  })

  return response;
}

static async createComment(data){
  const response = await this.request({
    method: 'POST',
    url: '/createcomment',
    data
  });
  return response;
}

static async userGalleries(){
  const response = await this.request({
    method: 'GET',
    url: '/my-galleries'
  })
  return {data:response.data}
}

// static async getComments( ){
//   const response = await this.request({
//     method:'GET',
//     url: `/comments`
//   })

//   return response;
// }

    // Dodajte ostale metode za ažuriranje, brisanje itd. po potrebi
}
