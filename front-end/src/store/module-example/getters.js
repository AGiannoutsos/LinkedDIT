


export default {
    // user: state => (state.user === undefined || state.user == null ? userTest : state.user),
    // posts: state => (state.posts === undefined || state.posts.length == 0 ? testing ? postsTest : [] : state.posts),
    user: state => (state.user),
    posts: state => (state.posts),
    proposals: state => (state.proposals),
    myProposals: state => (state.myProposals),
    connectedUsers: state => (state.connectedUsers),
    searchUserResults: state => (state.searchUserResults),
    connectionRequests: state => (state.connectionRequests),
    adminAllUsers: state => (state.adminAllUsers),
    adminAllUsersSelected: (state, getters) => () => {
        var selectedUsers = []
        for (let user of getters.adminAllUsers){
            if (user.selected) {
                selectedUsers.push(user)
            }
        }
        return selectedUsers
    },
    

}
