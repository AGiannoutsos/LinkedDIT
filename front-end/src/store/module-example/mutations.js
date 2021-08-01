import { Cookies } from 'quasar'
import { Notify } from 'quasar'

// taken from https://stackoverflow.com/questions/25764719/update-if-exists-or-add-new-element-to-array-of-objects-elegant-way-in-javascr
function upsert(array, item) {
    const i = array.findIndex(_item => _item.id === item.id);
    if (i > -1) array[i] = item;
    else array.push(item);
}

export default {

    STORE_TOKEN(state, payload) {
        Cookies.set("token", payload.token)
    },

    STORE_TOKEN_ADMIN(state, payload) {
        Cookies.set("adminToken", payload.token)
    },

    DELETE_TOKEN(state, payload) {
        Cookies.remove("token")
        Cookies.remove("adminToken")
    },

    STORE_USER(state, payload) {
        state.user = payload
    },

    STORE_CONNECTION_REQUESTS(state, payload) {
        state.connectionRequests = payload
    },

    STORE_INTERACTIONS(state, payload) {
        state.interactions = payload
    },

    STORE_DISCUSSIONS(state, payload) {
        state.discussions = payload
	},

    STORE_CONNECTED_USERS(state, payload) {
        state.connectedUsers = payload
	},

    STORE_RECOMMENDED_POSTS(state, payload) {
        // state.posts.push(...payload)
        // if no post was added the there no posts availabe
        var postsBefore = state.posts.length
        payload.forEach(element => {
            upsert(state.posts, element)
        });
        var postsAfter = state.posts.length

        if (postsBefore === postsAfter) {
            Notify.create({ 
                type: 'warning', 
                message: "There are no more posts availeble at the moment.", 
                position: "top" })
        }
	},

    STORE_MY_POSTS(state, payload) {
        state.myPosts = payload
	},

    STORE_PROPOSALS(state, payload) {
        // state.proposals.push(...payload)
        var proposalsBefore = state.proposals.length
        payload.forEach(element => {
            upsert(state.proposals, element)
        });
        var proposalsAfter = state.proposals.length

        if (proposalsBefore === proposalsAfter) {
            Notify.create({ 
                type: 'warning', 
                message: "There are no more proposals availeble at the moment.", 
                position: "top" })
        }
	},

    STORE_MY_PROPOSALS(state, payload) {
        state.myProposals = payload
	},

    STORE_CURRENT_DISCUSSION(state, payload) {
        state.currentDiscussionId = payload.id

        const idx = state.discussions.findIndex(d => d.id === payload.id);
        if (idx > -1) 
            state.discussions[idx] = payload
        else 
            state.discussions.push(payload)
	},

    POST_CONNECTION_REQUEST(state, payload) {
        const requestIdx = state.connectionRequests.findIndex(r => r.id === payload.id)
        state.connectionRequests.splice(requestIdx, 1)
	},
    
    POST_PERSONAL_DATA(state, payload) {
        const personalDataItemIdx = state.user.personalData.findIndex(d => d.title === payload.title)
        // Vue.set(state.user.personalData, personalDataItemIdx, payload)
        state.user.personalData[personalDataItemIdx] = payload
    },

    POST_COMMENT(state, payload) {
        const postIdx = state.posts.findIndex(b => b.id === payload.id)
        state.posts[postIdx].comments.push(payload.comment)
    },

    POST_POST(state, payload) {
        state.posts.unshift(payload)
	},

    THUMBS_UP(state, payload) {
        const postIdx = state.posts.findIndex(p => p.id === payload)
        state.posts[postIdx].likes.push(state.user)
	},

    THUMBS_DOWN(state, payload) {
        const postIdx = state.posts.findIndex(p => p.id === payload)
        const userIdx = state.posts[postIdx].likes.findIndex(u => u.id === state.user.id)
        state.posts[postIdx].likes.splice(userIdx, 1)
	},

    POST_PROPOSAL(state, payload) {
        state.myProposals.unshift(payload)
	},

    APPLY_UP(state, payload) {
        const proposalIdx = state.proposals.findIndex(p => p.id === payload)
        if (proposalIdx !== -1)
            state.proposals[proposalIdx].likes.push(state.user)
	},

    APPLY_DOWN(state, payload) {
        const proposalIdx = state.proposals.findIndex(p => p.id === payload)
        if (proposalIdx !== -1) {
            const userIdx = state.proposals[proposalIdx].likes.findIndex(u => u.id === state.user.id)
            state.proposals[proposalIdx].likes.splice(userIdx, 1)
        }
	},

    STORE_ADMIN_ALL_USERS(state, payload) {
        state.adminAllUsers = payload
	},

    

    POST_MESSAGE(state, payload) {
        const discussionIdx = state.discussions.findIndex(d => d.id = payload.id)
        state.discussions[discussionIdx].messages.push(payload.message)
	},

    SELECT_USER(state, payload) {
        const userIdx = state.adminAllUsers.findIndex(u => u.id === payload)
        state.adminAllUsers[userIdx].selected = !state.adminAllUsers[userIdx].selected 
	},
}
