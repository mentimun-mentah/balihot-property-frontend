import { Skeleton } from "antd";

import Card from "react-bootstrap/Card";

const LoadingCard = () => {
  return (
    <>
      <Card className="pos-unset border-0 shadow-card bor-rad-top-10 hov_none mt-2 mb-2">
        <Skeleton.Avatar
          active
          shape="square"
          style={{
            height: "230px",
            width: "100%",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px"
          }}
        />
        <Card.Body className="text-dark match-height">
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card.Body>
      </Card>
    </>
  );
};

export default LoadingCard;
