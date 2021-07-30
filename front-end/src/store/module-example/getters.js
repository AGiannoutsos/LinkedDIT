


export default {
    // user: state => (state.user === undefined || state.user == null ? userTest : state.user),
    // posts: state => (state.posts === undefined || state.posts.length == 0 ? testing ? postsTest : [] : state.posts),
    myUserId: state => ("12312312"),
    user: state => (state.user),
    posts: state => (state.posts),
    myPosts: state => (state.myPosts),

    proposals: state => (state.proposals),
    myProposals: state => (state.myProposals),

    connectedUsers: state => (state.connectedUsers),
    searchUserResults: state => (state.searchUserResults),

    connectionRequests: state => (state.connectionRequests),
    interactions: state => (state.interactions),

    adminAllUsers: state => (state.adminAllUsers),
    
    discussions: state => (state.discussions),
    discussionOtherUsers: (state,getters) => () => {
        var discussionOtherUsers = []
        for (let disc of getters.discussions) {
            if (disc.user1.id === getters.myUserId){
                discussionOtherUsers.push(disc.user2)
            } else {
                discussionOtherUsers.push(disc.user1)
            }
        }
        return discussionOtherUsers
    },
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
