'use strict';
app.value('messageFormatter', function(date, nick, message) {
    return date.toLocaleTimeString() + ' - ' +
           nick + ' - ' +
           message + '\n';

  });

app.value('nickName', 'anonymous');
