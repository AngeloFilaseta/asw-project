class Report{
    constructor(nextInputUsers){
        this.sentences = [];
        this.images = [];
        this.nextInputUsers = nextInputUsers;
    }
}

function createReport(nextInputUsers){
    return new Report(nextInputUsers)
}

module.exports = {createReport}
