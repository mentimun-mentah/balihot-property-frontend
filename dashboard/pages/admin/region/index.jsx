import { withAuth } from "../../../hoc/withAuth"
import AddRegion from "../../../components/Region/AddRegion";

const Region = () => {
  return <AddRegion />
};
export default withAuth(Region);
