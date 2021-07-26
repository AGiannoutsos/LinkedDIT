


export default {
    // user: state => (state.user === undefined || state.user == null ? userTest : state.user),
    // posts: state => (state.posts === undefined || state.posts.length == 0 ? testing ? postsTest : [] : state.posts),
    user: state => (state.user),
    posts: state => (state.posts),
    connectedUsers: state => (state.connectedUsers),
    searchUserResults: state => (state.searchUserResults),
}
