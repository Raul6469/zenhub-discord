import EstimateCleared from './Webhook/EstimateCleared';
import EstimateSet from './Webhook/EstimateSet';
import IssueReprioritized from './Webhook/IssueReprioritized';
import IssueTransfer from "./Webhook/IssueTransfer";

type Webhook = 
  EstimateCleared     |
  EstimateSet         |
  IssueReprioritized  |
  IssueTransfer       ;

export default Webhook;
