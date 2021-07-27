var testAdminAllUsers = [
    {
        id: "12312sdfd312",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        firstName: "Andreas",
        lastName: "Giannoutsos",
        email: "andreas.giannoutsos@gmail.com",
        personalData: [
            {
                title: "Profession",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Current Job Position",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Professional Experience",
                content: "Lorepom den 8elo na kano auth th douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Education",
                content: "Lorepom panta eixa kalous ba8mous giati mou aresei to 8elo na epodioko oso perissotero kalutare mporo kai gmtoxm den 8elo mia douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Skills",
                content: "Lorepom gnorizo pragmata pou se 3 xronia ua einai irrelevant",
                visibility: true
            },
        ]
    },
    {
        id: "1231sdfsd2312",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        firstName: "Andreas",
        lastName: "Giannoutsos",
        email: "andreas.giannoutsos@gmail.com",
        personalData: [
            {
                title: "Profession",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Current Job Position",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Professional Experience",
                content: "Lorepom den 8elo na kano auth th douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Education",
                content: "Lorepom panta eixa kalous ba8mous giati mou aresei to 8elo na epodioko oso perissotero kalutare mporo kai gmtoxm den 8elo mia douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Skills",
                content: "Lorepom gnorizo pragmata pou se 3 xronia ua einai irrelevant",
                visibility: true
            },
        ]
    },
    {
        id: "12312gfgs312",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        firstName: "Andreas",
        lastName: "Giannoutsos",
        email: "andreas.giannoutsos@gmail.com",
        personalData: [
            {
                title: "Profession",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Current Job Position",
                content: "KOroideuo KOsmo",
                visibility: true
            },
            {
                title: "Professional Experience",
                content: "Lorepom den 8elo na kano auth th douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Education",
                content: "Lorepom panta eixa kalous ba8mous giati mou aresei to 8elo na epodioko oso perissotero kalutare mporo kai gmtoxm den 8elo mia douleia gia 900 euro gmtxm kalytera na allajo kariera",
                visibility: true
            },
            {
                title: "Skills",
                content: "Lorepom gnorizo pragmata pou se 3 xronia ua einai irrelevant",
                visibility: true
            },
        ]
    }
]



export default {

    async postComment({ commit, getters, dispatch }, comment) {
        commit("POST_COMMENT", comment)
    },

    
    async editPersonalData({ commit, getters, dispatch }, personalData) {
        commit("EDIT_PERSONAL_DATA", personalData)
    },
    
    async postPost({ commit, getters, dispatch }, post) {
        commit("POST_POST", post)
    },

    async thumbsUp({ commit, getters, dispatch }, postId) {
        commit("THUMBS_UP", postId)
    },

    async thumbsDown({ commit, getters, dispatch }, postId) {
        commit("THUMBS_DOWN", postId)
    },

    async postProposal({ commit, getters, dispatch }, proposal) {
        commit("POST_PROPOSAL", proposal)
    },
    
    async applyUp({ commit, getters, dispatch }, proposalId) {
        commit("APPLY_UP", proposalId)
    },

    async applyDown({ commit, getters, dispatch }, proposalId) {
        commit("APPLY_DOWN", proposalId)
    },

    async adminGetAllUsers({ commit, getters, dispatch }) {

        var allUsers = testAdminAllUsers
        // add selected attribute
        allUsers.forEach(element => {element.selected = false});

        commit("STORE_ADMIN_ALL_USERS", allUsers)
    },

    async selectUser({ commit, getters, dispatch }, userId) {
        commit("SELECT_USER", userId)
    },

}

