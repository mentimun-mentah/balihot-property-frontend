import { Result } from 'antd';
import Button from 'react-bootstrap/Button';
import Link from "next/link";

const NotFoundPage = () => (
  <div className="m-t-70">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link href="/" as="/" replace>
          <Button variant="dark">Back Home</Button>
        </Link>
      }
    />
  </div>
)

export default NotFoundPage;
