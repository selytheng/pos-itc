import { AreaCards, AreaCharts, AreaTop } from "../../components";

const Dashboard = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <div>
        <AreaCards />
        <AreaCharts />
      </div>
    </div>
  );
};

export default Dashboard;
