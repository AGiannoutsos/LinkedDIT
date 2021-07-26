export default {



    async postComment({ commit, getters, dispatch }, comment) {
        // Get token
        // var token = getters.token
        // var projectLs = getters.project
        // var projectsLs = getters.projects
        // client.tokenObject.token = token
        // client.project = projectLs
        // client.user.projects = projectsLs

        // commit("SET_LOADING_STATE", true) 
        // return actions.disconnectSprint(task)
        // .then( response => {
        //     console.log(response);
        //     console.log(client)
        //     // commit("STORE_TASK_TO_SPRINT", {task:task, sprint:sprint})
        //     dispatch("getScrumBoard")
        //     commit("SET_LOADING_STATE", false)
        //     return response
        // })
        // .catch( error => { 
        //     console.log(error);
        //     dispatch("getScrumBoard")
        //     commit("SET_LOADING_STATE", false)
        //     throw error;
        // })
        commit("POST_COMMENT", comment)
    },

    async postPost({ commit, getters, dispatch }, post) {
        commit("POST_POST", post)
    },

    async editPersonalData({ commit, getters, dispatch }, personalData) {
        commit("EDIT_PERSONAL_DATA", personalData)
    },

    async thumbsUp({ commit, getters, dispatch }, postId) {
        commit("THUMBS_UP", postId)
    },

    async thumbsDown({ commit, getters, dispatch }, postId) {
        commit("THUMBS_DOWN", postId)
    },
}
