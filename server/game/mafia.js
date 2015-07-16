var Random = require('random-js'),
    random = new Random(Random.engines.mt19937().autoSeed());

var roles = {
    1: {
        id: 1,
        type: 'mafia',
        img: '/content/img/mafia.jpg'
    },
    2: {
        id: 2,
        type: 'doctor',
        img: '/content/img/doctor.jpg'
    },
    3: {
        id: 3,
        type: 'whore',
        img: '/content/img/whore.jpg'
    },
    4: {
        id: 4,
        type: 'maniac',
        img: '/content/img/maniac.jpg'
    },
    5: {
        id: 5,
        type: 'sheriff',
        img: '/content/img/sheriff.jpg'
    },
    6: {
        id: 6,
        type: 'vegetable',
        img: '/content/img/vegetable.jpg'
    }
};

var map = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
},
    roundRole = [];

module.exports = function(options, playersObj, count) {

    init(count);

    for (var field in playersObj) if (playersObj.hasOwnProperty(field) && !playersObj.Leading) {
        playersObj[field].Role = roles[getRole(count)];
    }

    return {
        players: playersObj,
        firstNight: true,
        count: count,

        getPerson: function() {
            return getPersonForRound(playersObj);
        }
    };

};

function init(count) {
    map[1] = 0;
    map[2] = 0;
    map[3] = 0;
    map[4] = 0;
    map[5] = 0;
    map[6] = 0;

    var i;

    if (count > 8) {
        roundRole = [1, 1, 2, 3, 4, 5];

        for (i = roundRole.length; i < count; i++) {
            roundRole.push(6);
        }
    } else if (count > 5 && count < 9) {
        roundRole = [1, 1, 2, 4, 5];

        for (i = roundRole.length; i < count; i++) {
            roundRole.push(6);
        }
    } else {
        roundRole = [1, 1];

        for (i = roundRole.length; i < count; i++) {
            roundRole.push(6);
        }
    }
}

function getRole(count) {

    var val = getVal(count),
        result;

    if (roundRole[val]) {
        result = roundRole[val];
        delete roundRole[val];
    } else {
        result = getRole(count);
    }

    return result;

}

function getVal(count) {
    return random.integer(0, count)
}

function getPersonForRound(list) {

    var isMafia = false,
        isManiac = false,
        isDoctor = false,
        isWhore = false,
        isSheriff = false;

    for (var field in list)
        if (list.hasOwnProperty(field) && !list.Leading) {
        if (list[field].Role.id != 6) {
            if (list[field].Role.id === 1) isMafia = true;
            if (list[field].Role.id === 2) isDoctor = true;
            if (list[field].Role.id === 3) isWhore = true;
            if (list[field].Role.id === 4) isManiac = true;
            if (list[field].Role.id === 5) isSheriff = true;
        }
    }

    var result = [];

    if (isWhore) result.push('Красотка');
    if (isDoctor) result.push('Доктор');
    if (isMafia) result.push('Мафия');
    if (isManiac) result.push('Маньяк');
    if (isSheriff) result.push('Комиссар');

    return result;

}
