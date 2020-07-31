const HorizontalPlaceholder = () => {
  return (
    <>
      <div className="ph-item">
        <div className="col-5">
          <div className="ph-picture" />
        </div>
        <div className="col-7">
          <div className="ph-row">
            <div className="ph-col-10 big" />
            <div className="ph-col-6" />
            <div className="ph-col-4 empty" />

            <div className="ph-col-2" />
            <div className="ph-col-2 big" />
            <div className="ph-col-2" />
            <div className="ph-col-10 big" />
            <div className="ph-col-12 big" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .ph-item {
          direction: ltr;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          padding: 0;
          overflow: hidden;
          margin-bottom: 0px;
          background-color: #fff;
          border: 0px solid;
        }
        .ph-item > * {
          padding: 0px;
        }
        .ph-row div {
          height: 24px;
          margin-bottom: 15px;
          margin-left: 15px;
          margin-right: 15px;
        }
        .ph-picture {
          height: 180px;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default React.memo(HorizontalPlaceholder);
