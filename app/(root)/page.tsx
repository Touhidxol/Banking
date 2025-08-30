import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

const home = () => {
  const loggedIn = { firstName: "Franklin" ,lastName:"Goes",email:"contanct.frank@wmail.com"};

  return (
    <section className="home">
      <div className="!home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your Accounts and Transactions."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1864.55}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance:123.50},{currentBalance:500.23}]}
      />
    </section>
  );
};

export default home;
