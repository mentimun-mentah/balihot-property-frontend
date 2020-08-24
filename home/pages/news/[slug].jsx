import Container from "react-bootstrap/Container";

const DetailNews = () => {
  return(
    <>
      <header>
        <div className="full-width-image">
          <img
            src="https://news.airbnb.com/wp-content/uploads/sites/4/2020/07/PJM013418Q412-20181007_Airbnb_Mallorca_DRE_3613_Featured.jpg?w=3003"
            height="400"
            alt=""
          />
        </div>
      </header>

      <Container className="mt-6 mb-5">
        <h1 className="text-capitalize fs-24-s fs-26-m fs-40-t">
          for the first time since march, guests book 1 million nights in one
          day
        </h1>
        <div className="news-information font-weight-lighter fs-14 mt-3">
          <span className="mr-1">17 Agustus 2020</span> 
          {" "}&#8226;{" "}
          <span className="share-news ml-1">
            <a><i className="fal fa-share-square" /> Share</a>
          </span>
        </div>
        <hr className="mt-4 mb-4" />
        <div className="post__entryContent ">
          <p>
            At Airbnb, we believe that people’s desire to safely connect and be
            with one another has only grown stronger while we’ve been apart. Our
            business has not recovered, but we are seeing encouraging signs.
          </p>
          <p>
            On July 8, guests booked more than 1 million nights’ worth of future
            stays at Airbnb listings around the world. It’s the first day in
            more than four months, since March 3, that the 1 million nights
            threshold has been reached.
          </p>
          <p>
            Guests booking on July 8 did so in over 175 different countries and
            regions, including destinations in Togo, Angola, Bahrain, Svalbard
            and Kyrgyzstan. Nights booked skew toward domestic travel.
          </p>
          <p>
            Most guests are not traveling far: Approximately half of these
            nights booked were for travel to destinations within 300 miles. Over
            two-thirds were for travel to destinations within 500 miles, both
            distances typically manageable by car. And in rural areas of the
            US*,{" "}
            <a href="https://news.airbnb.com/rural-stays-and-online-experiences-boost-host-income/">
              hosts earned over $200 million in the month of June
            </a>
            , an increase of more than 25 percent over what hosts in these areas
            earned in June 2019.
          </p>
          <p>
            But they are looking to get away: Two-thirds of the nights booked
            were at destinations outside of cities.&nbsp;&nbsp;
          </p>
          <p>
            And many are looking to do so affordably: Slightly more than half of
            the nights booked on July 8 were for listings costing no more than
            $100 per night.&nbsp;
          </p>
          <p>
            Pent-up demand may be playing a role. A significant portion of
            nights booked were for travel beginning within 30 days: i.e., trips
            that will start on or before August 7.
          </p>
          <p>
            And, over 60 percent of the nights booked were for travel by people
            traveling solo or with one other person. But there were over 17,000
            nights booked by guests who are traveling in a group of 10 or
            more.&nbsp;
          </p>
          <p>
            Because short-term rentals are typically entire homes, guests get
            more space for their money and more control over their environment,
            including private entrances and amenities such as kitchens and
            swimming pools. Combined with the availability of entire homes
            within driving distance for travelers and the Airbnb Enhanced Clean
            protocol for ensuring clean, sanitized accommodations, Airbnb’s
            short-term rentals are recovering because consumers see them as a
            safe, healthy and responsible way for guests to travel.
          </p>
          <p>
            <em>
              * Rural areas are defined as areas with fewer than 100 inhabitants
              per square kilometer
            </em>
            .
          </p>
        </div>
      </Container>

      <style jsx>{`
        :global(.mt-6) {
          margin-top: 6rem !important;
        }

        .full-width-image {
          width: 100vw;
          position: relative;
          left: 50%;
          margin-left: -50vw;
          top: 4rem;
          bottom: 4rem;
        }

        .full-width-image img {
          width: 100%;
          object-fit: cover;
        }

        :global(.txt-space-pre-line) {
          white-space: pre-line;
        }
        
        :global(.share-news:hover){
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

export default DetailNews
