<template>
  <div class="posts">
    <h1>Register User</h1>    
    <span><b>{{ response }}</b></span><br />
    
  </div>
</template>

<script>
import PostsService from '@/services/apiService'
export default {
  name: 'response',
  data () {
    return {
      response: {}
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const apiResponse = await PostsService.registerUser()
      this.response = apiResponse.data
    }
  }
}
</script>
