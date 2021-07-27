// import Vue from "vue"

export default {
    
    EDIT_PERSONAL_DATA(state, payload) {
        const personalDataItemIdx = state.user.personalData.findIndex(d => d.title === payload.title)
        // Vue.set(state.user.personalData, personalDataItemIdx, payload)
        state.user.personalData[personalDataItemIdx] = payload
    },

    POST_COMMENT(state, payload) {
        const postIdx = state.posts.findIndex(b => b.id === payload.id)
        state.posts[postIdx].comments.push(payload.comment)
    },

    POST_POST(state, payload) {
        state.posts.push(payload)
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
        state.myProposals.push(payload)
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
}
