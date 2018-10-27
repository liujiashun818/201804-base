module.exports = {
    appId: '5b82587413cde3296495c735',
    appKey: "9f4d4f7b-f4c6-4d55-bae1-4dbbe5753863",

    redirect_uri: 'http://localhost:4000/users/callback',

    authorizeUrl: 'http://localhost:5000/oauth2.0/authorize?',
    fetchTokenUrl: 'http://localhost:5000/oauth2.0/token?',
    fetchMeUrl: 'http://localhost:5000/oauth2.0/me?',

    fetchUserInfo: 'http://localhost:5000/users/get_user_info?'

}