import EstimateCleared from './EstimateCleared';
import EstimateSet from './EstimateSet';
import IssueReprioritized from './IssueReprioritized';
import IssueTransfer from "./IssueTransfer";

type Webhook = 
  EstimateCleared     |
  EstimateSet         |
  IssueReprioritized  |
  IssueTransfer       ;

export default Webhook;
