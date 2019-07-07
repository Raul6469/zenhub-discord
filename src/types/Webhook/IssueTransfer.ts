import Base from "./Base";

export default interface IssueTransfer extends Base {
  type: 'issue_transfer';
  to_pipeline_name: string;
  from_pipeline_name: string;
};
