import Base from "./Base";

export default interface EstimateSet extends Base {
  type: 'estimate_set';
  estimate: string;
};
