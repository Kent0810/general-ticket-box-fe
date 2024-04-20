import WrapperContainer from "components/WrapperContainer";
import React from "react";

const Footer = () => {
  const footerData = [
    {
      title: "General Ticket Box",
      data: [
        "About Us",
        "Investor Relation",
        "Career",
      ],
    },
    {
      title: "Legal",
      data: ["Terms & Conditions", "Cookies Policy", "Privacy Policy"],
    },
    {
      title: "Support",
      data: ["Customer Care", "Customer Service Plan", "Web Accessibility"],
    },
    {
      title: "Useful Information",
      data: ["Return Policy", "Taxes, Fees, Charges & Surcharges"],
    },
  ];
  return (
    <footer>
      <WrapperContainer>
        <div className="footer">
          <div className="row">
            {footerData.map((data) => (
              <div className="footer-section col" key={data.title}>
                <p>{data.title}</p>
                <ul>
                  {data.data.map((value, idx) => (
                    <li key={idx}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-footnote">
            <small>
              © 2024 General Ticket Box. Note: Link opens in new window. Site may
              not meet accessibility guidelines.
            </small>
          </div>
        </div>
      </WrapperContainer>
    </footer>
  );
};

export default Footer;
