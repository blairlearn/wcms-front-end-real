
import { ClinicalTrialsService, TermResults, TermResult, InterventionResults, InterventionResult, DiseaseResults, DiseaseResult} from 'Services/clinical-trials';

//Statuses of what Cancer.gov trials should be shown
const VIEWABLE_TRIALS:string[] = [
    "Active",
    "Approved", 
    "Enrolling by Invitation",
    "In Review",
    "Temporarily Closed to Accrual",
    "Temporarily Closed to Accrual and Intervention"
];

/**
 * Facade wrapping a ClinicalTrialsService instance to create app specific methods
 * and simplify interacting with API.
 */
export class CTAPIFacade {

    private svc:ClinicalTrialsService;

    constructor(svc: ClinicalTrialsService) {
        this.svc = svc;
    }

    /**
     * Gets a list of countries for populating the Countries dropdown
     */
    getCountries():Promise<string[]> { 
        return this.svc.getTerms(
            "sites.org_country",
            { 
                sort: "term",
                current_trial_statuses: VIEWABLE_TRIALS
            },
            100
        ).then((res:TermResults) => {
            return res.terms.map(term => term.term)
        })
    }

    /**
     * Gets hospital/institution to populate the Hospital/Institution field
     */
    searchHospital(searchText:string):Promise<TermResult[]> { 
        return this.svc.getTerms(
            "sites.org_name",
            { 
                term: searchText,
                sort: "term",
                current_trial_statuses: VIEWABLE_TRIALS
            },
            10
        ).then((res:TermResults) => {
            return res.terms
        })
    }

    /**
     * Gets trial investigators to populate the Trial Investigators field
     */
    searchTrialInvestigators(searchText:string):Promise<TermResult[]> { 
        return this.svc.getTerms(
            "principal_investigator",
            { 
                term: searchText,
                sort: "term",
                current_trial_statuses: VIEWABLE_TRIALS
            },
            10
        ).then((res:TermResults) => {
            return res.terms
        })
    }

    /**
     * Gets lead orgs to populate the Lead Organization field
     */
    searchLeadOrg(searchText:string):Promise<TermResult[]> { 
        return this.svc.getTerms(
            "lead_org",
            { 
                term: searchText,
                sort: "term",
                current_trial_statuses: VIEWABLE_TRIALS
            },
            10
        ).then((res:TermResults) => {
            return res.terms
        })
    }

    /**
     * Gets drugs intervention items for search field
     * Dummy data - remove when endpoint is in place
     */
    getDiseases(searchText:string):Promise<DiseaseResult[]> {
        return this.svc.getDiseases(
            "disease", 
            searchText
        ).then((res:DiseaseResults) => {
            return res.terms
        })
    }


    /**
     * Gets drugs intervention items for search field
     * Dummy data - remove when endpoint is in place
     */
    searchDrugs(searchText:string):Promise<InterventionResult[]> {
        return this.svc.getInterventions(
            ["Agent", "Agent Category"],
            searchText,
            10,
            {
                current_trial_status: VIEWABLE_TRIALS
            }
        ).then((res:InterventionResults) => {
            return res.terms
        })
    }

    /**
     * Gets other intervention items for search field
     * Dummy data - remove when endpoint is in place
     */
    searchOtherInterventions(searchText:string):Promise<InterventionResult[]> {
        return this.svc.getInterventions(
            "Other",
            searchText,
            10,
            {
                current_trial_status: VIEWABLE_TRIALS
            }
        ).then((res:InterventionResults) => {
            return res.terms
        })
    }

    //TODO: add other getField methods.

}