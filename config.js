/**
 * Created by lucavgobbi on 7/23/15.
 */


module.exports = {
    mongoDb: {
        server: '127.0.0.1',
        port: '27017',
        user: 'user',
        password: 'password',
        databaseName: 'photo-portfolio'
    },
    email: {
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: '',
            pass: ''
        }
    },
    appPath: '/Users/lucavgobbi/Development/photo-portfolio/'
};