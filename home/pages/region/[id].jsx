import { useSelector } from "react-redux";
import axios from "../../lib/axios";
import * as actions from "../../store/actions";
import Col from "react-bootstrap/Col"
import parse from 'html-react-parser';

const Region = () => {
  const region = useSelector(state => state.region.region)
  return (
    <>
        {region && region.length > 0 && (
          <section>
            {region && region.map(data => (
              <>
              <Col key={data.id} className="pl-0 border-bottom">
                <img src={`${process.env.API_URL}/static/regions/${data.image}`} alt={data.name} width="200" height="300" />
                <p>{data.name}</p>
                {parse(data.description)}
              </Col>
              </>
            ))}
          </section>
        )}
    </>
  )
};

Region.getInitialProps = async (ctx) => {
  const resRegion = await axios.get('/regions?listing=true');
  ctx.store.dispatch(actions.getRegionSuccess(resRegion.data)); 
};

export default Region;
