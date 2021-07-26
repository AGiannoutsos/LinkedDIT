import Vue from "vue"

export default {
    POST_COMMENT(state, payload) {
        const postIdx = state.posts.findIndex(b => b.id === payload.id)
        state.posts[postIdx].comments.push(payload.comment)
	},

    POST_POST(state, payload) {
        state.posts.push(payload)
	},
}
