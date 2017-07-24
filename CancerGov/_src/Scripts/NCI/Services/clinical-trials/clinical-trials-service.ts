import { CTAPIConnection, TermResults, InterventionResults } from './';

/**
 * This class represents the methods to accessing a CTAPI service
 */
export interface ClinicalTrialsService {

    /**
     * Gets terms from the terms endpoint
     * 
     * @param termType The term type
     * @param additionalParams Additional params to use in narrowing endpoint call.  Add search keywords here & sort options. See API for additional params.
     * @param sort The sort order
     * @param size The number of terms to return. NOTE: API allows max of 100
     * @param from The 0-based offset of where to start fetching terms from.
     */
    getTerms(termType: string, additionalParams?:any, size?:number, from?:number): Promise<TermResults>;

    /**
     * Gets interventions from the interventions endpoint
     * 
     * @param category The high-level type of the term (agent, agent_category, other) (OPTIONAL)
     * @param intervention Type ahead support to search for the interventions (OPTIONAL)
     * @param interventionType The specific intervention type (OPTIONAL)
     * //Will probably get sort, size, from?
     */
    getInterventions(category?: string|string[], intervention?: string, interventionType?: string|string[]): Promise<InterventionResults>;
}
