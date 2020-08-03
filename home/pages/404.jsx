import { Result } from "antd";
import Button from "react-bootstrap/Button";

const clickHandle = () => {
  document.location.href = process.env.BASE_URL;
};

const NotFoundPage = () => (
  <div className="m-t-70">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button variant="dark" onClick={clickHandle}>
          Back Home
        </Button>
      }
    />
  </div>
);

export default NotFoundPage;
