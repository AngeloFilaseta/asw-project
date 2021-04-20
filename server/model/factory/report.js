class Report{
    constructor(nextInputUser){
        this.sentences = [];
        this.images = [];
        this.nextInputUser = nextInputUser;
    }
}


function createReport(nextInputUser){
    return new Report(nextInputUser)
}

module.exports = {createReport}
