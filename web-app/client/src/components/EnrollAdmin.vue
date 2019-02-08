<template>
  <div class="posts">
    <h1>Enroll Admin</h1>    
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
    this.load()
  },
  methods: {
    async load () {
      const apiResponse = await PostsService.enrollAdmin()
      this.response = apiResponse.data
    }
  }
}
</script>
