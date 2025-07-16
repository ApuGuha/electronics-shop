

export const About = () => {
  return (
   <>
   <section className="section">
      <div className="container about-banner">
        <div className="ab-left">
          <h3>Our Story</h3>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="ab-right">
          <img src="./image/about-banner.png" alt="" />
        </div>
      </div>
    </section>

    <section>
      <div className="container services_container_02">
        <div className="service">
          <img src="./image/Services-01.png" alt="" className="service_img" />
          <h3 className="service_title">10.5k</h3>
          <p className="service_p">Sallers active our site</p>
        </div>
        <div className="service">
          <img src="./image/Services-02.png" alt="" className="service_img" />
          <h3 className="service_title">45.5k</h3>
          <p className="service_p">Customer active in our site</p>
        </div>
        <div className="service">
          <img src="./image/Services-03.png" alt="" className="service_img" />
          <h3 className="service_title">25k</h3>
          <p className="service_p">Anual gross sale in our site</p>
        </div>
      </div>
    </section>

    <section>
      <div className="container team_section">
        <div className="team-member">
          <img src="./image/tom.png" alt="" className="service_img" />
          <h3 className="service_title">Tom Cruise</h3>
          <p className="service_p">Founder & Chairman</p>
        </div>
        <div className="team-member">
          <img src="./image/emma.png" alt="" className="service_img" />
          <h3 className="service_title">Emma Watson</h3>
          <p className="service_p">Managing Director</p>
        </div>
        <div className="team-member">
          <img src="./image/will.png" alt="" className="service_img" />
          <h3 className="service_title">Will Smith</h3>
          <p className="service_p">Product Designer</p>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container services_container">
        <div className="service">
          <img src="./image/icons/service-1.png" alt="" className="service_img" />
          <h3 className="service_title">FAST AND FREE DELIVERY</h3>
          <p className="service_p">Free delivery for all orders</p>
        </div>
        <div className="service">
          <img src="./image/icons/service-2.png" alt="" className="service_img" />
          <h3 className="service_title">24/7 SUPPORT</h3>
          <p className="service_p">Friendly 24/7 customer support</p>
        </div>
        <div className="service">
          <img src="./image/icons/service-3.png" alt="" className="service_img" />
          <h3 className="service_title">MONEY BACK GUARANTY</h3>
          <p className="service_p">We reurn money within 30 days</p>
        </div>
      </div>
    </section>
   </>
  )
}
