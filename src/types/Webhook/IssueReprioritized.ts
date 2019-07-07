import Base from "./Base";

export default interface IssueReprioritized extends Base {
  type: "issue_reprioritized";
  to_pipeline_name: string;
  from_position: string;
  to_position: string;
}
