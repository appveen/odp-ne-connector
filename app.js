const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const log4js = require('log4js');

const mailUtils = require('./utils/mail.utils');
const templateUtils = require('./utils/template.utils');

const PORT = process.env.PORT || 3000;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const logger = log4js.getLogger('Server');
const app = express();

log4js.configure({
    appenders: { 'out': { type: 'stdout' }, server: { type: 'multiFile', base: 'logs/', property: 'categoryName', extension: '.log', maxLogSize: 10485760, backups: 3, compress: true } },
    categories: { default: { appenders: ['out', 'server'], level: LOG_LEVEL } }
});

const eventGroups = JSON.parse(fs.readFileSync('event-group.map.json'));
const userGroups = JSON.parse(fs.readFileSync('group-user.map.json'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use((req, res, next) => {
    logger.info(req.method, req.headers['x-forwarded-for'] || req.connection.remoteAddress, req.path);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/data', (req, res) => {
    const payload = req.body;
    const groups = eventGroups[payload.eventId];
    let users = [];
    groups.forEach(group => {
        if (userGroups[group] && Array.isArray(userGroups[group])) {
            users = users.concat(userGroups[group]);
        }
    });
    const arr = [];
    users.forEach(user => {
        arr.push(mailUtils.sendMail(user, 'notification@appveen.com', templateUtils.getSubject(payload), templateUtils.getHTML(payload)));
    });
    Promise.all(arr).then(status => {
        if (Array.isArray(status)) {
            status.forEach(item => {
                logger.info(item);
            });
        } else {
            logger.info(status);
        }
    }).catch(err => {
        if (Array.isArray(err)) {
            err.forEach(e => {
                logger.error(e);
            });
        } else {
            logger.error(err);
        }
    });
    res.status(200).json({
        messsage: 'Created'
    });
});

app.listen(PORT, (err) => {
    if (!err) {
        logger.info('Server is listening on port', PORT);
    } else {
        logger.error(err);
    }
});