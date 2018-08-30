import {
    PatientlistMysqlReport
} from '../patientlist-mysql.report';

export class PatientStatusCohortAnalysisReport extends PatientlistMysqlReport {
    constructor(params) {
        // params.groupBy = 'groupByEndDate';
        super('patientStatusCohortAnalysisAggregate', params.requestParams || params )
    }

    generateReport() {
        let start = new Date();
        return new Promise((resolve, reject) => {
            super.generateReport()
            .then((results) => {
                results.duration = (new Date() - start) / 1000;
                results.size = results ? results.results.results.length : 0;
                results.result = results ? results.results.results : [];
                delete results['results'];
                resolve(results);
            })
            .catch((errors)=>{
                console.error(errors);
                reject(errors);
            });
        });
    }

    generatePatientListReport(indicators) {
        let start = new Date();
        const that = this;
        return new Promise((resolve, reject) => {
            console.log(that.params);
            super.generatePatientListReport(indicators)
            .then((results) => {
                let result = {};
                result.duration = (new Date() - start) / 1000;
                result.result = results ? results.results.results : [];
                result.schemas = result.schemas;
                result.sqlQuery = result.sqlQuery;
                resolve(result);
            })
            .catch((errors)=>{
                console.error(errors);
                reject(errors);
            });
        });
    }
}