var moment = require('moment');
var fs = require('fs');
var content = fs.readFileSync('testData.json');
var contentJson = JSON.parse(content);

var data1 = [{
        date: '2019-01-01',
        sales: 30
        },
        {
        date: '2019-01-02',
        sales: 40
        },
        {
        date: '2019-01-10',
        sales: 50
        },
        {
        date: '2019-01-20',
        sales: 60
        }
    ]
var weekwise = []
var monthwise = weekFormat(data1);
console.log(' Data : ', monthwise);

//console.log(week);
function weekFormat(data) {
    console.log('inside the Weekwise Data ', data);
    weekwise = [];
    data.forEach((rec) => {
        weekno = moment(rec.date).week();
        var dateTemp = {week: '', unitSold: 0}
        dateTemp.week = weekno;
        dateTemp.unitSold = rec.unitSold;
        var existingweek = false;
        weekwise.forEach((w) => {
        if (w.week == weekno) {
        w.unitSold += rec.unitSold;
        existingweek = true;
        }
        });
        console.log('Added Week', dateTemp);
        if (!existingweek) {
            console.log(' ----Pushedb Week', dateTemp);
            weekwise.push(dateTemp);
        }
    });
    console.log('Week is : ' + weekWise);
    return weekWise;
}

//console.log(weekwise);

//var data1 = [{
    //     date: '2019-01-01',
    //     sales: 30
    //     },
    //     {
    //     date: '2019-01-02',
    //     sales: 40
    //     },
    //     {
    //     date: '2019-01-10',
    //     sales: 50
    //     },
    //     {
    //     date: '2019-01-20',
    //     sales: 60
    //     }
    // ]