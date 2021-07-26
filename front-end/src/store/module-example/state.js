var userTest = {
  id: "12312312",
  avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
  firstName: "Andreas",
  lastName: "Giannoutsos",
}

var postsTest = [
  {
      id: "10000",
      user: {
          id: "12312312",
          avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          firstName: "Andreas",
          lastName: "Giannoutsos",
      },
      content: {
          text: "lorpon this is a tsting post",
          file: "",
      },
      comments: [
          {
              user: {
                  id: "12312312",
                  avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
                  firstName: "Andreas",
                  lastName: "Giannoutsos",
              },      
              content: {
                  text: "lorpon this is a tsting comment",
              },
          },
          {
              user: {
                  id: "566612312",
                  avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
                  firstName: "Smaragda",
                  lastName: "Reppa",
              },      
              content: {
                  text: "yees lorpon this is another testing comment",
              },
          },
      ]
  },
  {
      id: "20000",
      user: {
          id: "566612312",
          avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          firstName: "Smaragda",
          lastName: "Reppa",
      },
      content: {
          text: "ok yess this is another tsting post yeees, ok yess this is another tsting post yeees ok yess this is another tsting post yeees, ok yess this is another tsting post yeees",
          file: "",
      },
      comments: [
          {
              user: {
                  id: "12312312",
                  avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
                  firstName: "Andreas",
                  lastName: "Giannoutsos",
              },      
              content: {
                  text: "123 another lorpon this is a tsting comment",
              },
          },
          {
              user: {
                  id: "566612312",
                  avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
                  firstName: "Smaragda",
                  lastName: "Reppa",
              },      
              content: {
                  text: "coment here yees it workss",
              },
          },
      ]
  },
]

var testing = true


export default  {
  user: testing ? userTest : null,
  posts: testing ? postsTest : [],
}
